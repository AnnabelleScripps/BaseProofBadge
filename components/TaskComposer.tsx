'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import { trackTransaction } from '@/utils/track';
import {
  APP_NAME,
  APP_TRACKING_ID,
  CHAIN_ID,
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
} from '@/lib/contract';
import { canEncodeTaskContent, encodeTaskContent } from '@/lib/task-content';

function normalizeBatchInput(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function getErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'shortMessage' in error) {
    return String(error.shortMessage);
  }
  if (error instanceof Error) return error.message;
  return 'Transaction failed.';
}

export function TaskComposer() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [taskNote, setTaskNote] = useState('');
  const [batchNotes, setBatchNotes] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | null>(
    null,
  );
  const [txMode, setTxMode] = useState<'single' | 'batch' | null>(null);
  const trackedHashRef = useRef<string | null>(null);

  const isWrongNetwork = chain?.id !== undefined && chain.id !== CHAIN_ID;
  const batchItems = useMemo(() => normalizeBatchInput(batchNotes), [batchNotes]);

  const { data: hash, writeContract, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    chainId: CHAIN_ID,
  });

  useEffect(() => {
    if (!error) return;
    setFeedbackType('error');
    setFeedback(getErrorMessage(error));
  }, [error]);

  useEffect(() => {
    if (!isSuccess || !hash || trackedHashRef.current === hash) return;
    trackedHashRef.current = hash;
    trackTransaction(APP_TRACKING_ID, APP_NAME, address, hash);
    setFeedbackType('success');
    setFeedback(
      txMode === 'batch'
        ? 'Batch created successfully on Base.'
        : 'Task created successfully on Base.',
    );
    if (txMode === 'single') setTaskNote('');
    if (txMode === 'batch') setBatchNotes('');
  }, [address, hash, isSuccess, txMode]);

  const ensureBase = () => {
    if (!isWrongNetwork) return true;
    switchChain({ chainId: CHAIN_ID });
    return false;
  };

  const handleCreateTask = () => {
    if (!address || !taskNote.trim()) return;
    if (!canEncodeTaskContent(taskNote)) {
      setFeedbackType('error');
      setFeedback('Single task note must fit within 32 bytes.');
      return;
    }
    if (!ensureBase()) return;
    setFeedback(null);
    setTxMode('single');
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'createTask',
      args: [encodeTaskContent(taskNote)],
      chainId: CHAIN_ID,
    });
  };

  const handleBatchCreate = () => {
    if (!address || batchItems.length === 0) return;
    const invalid = batchItems.find((item) => !canEncodeTaskContent(item));
    if (invalid) {
      setFeedbackType('error');
      setFeedback(`Batch note "${invalid}" exceeds the bytes32 storage limit.`);
      return;
    }
    if (!ensureBase()) return;
    setFeedback(null);
    setTxMode('batch');
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'batchCreate',
      args: [batchItems.map((item) => encodeTaskContent(item))],
      chainId: CHAIN_ID,
    });
  };

  return (
    <section className="panel-card">
      <div className="panel-heading">
        <div>
          <div className="section-kicker">Compose</div>
          <h2>Create tasks and note flows</h2>
        </div>
        <span className="task-count">
          32-byte notes, stored directly in the contract
        </span>
      </div>

      <div className="task-form-grid">
        <div className="field-row">
          <label className="input-label" htmlFor="task-note">
            Single task note
          </label>
          <textarea
            id="task-note"
            className="text-area"
            value={taskNote}
            onChange={(event) => setTaskNote(event.target.value)}
            placeholder="Example: Ship landing page copy"
          />
          <div className="helper-row">
            Use short notes that fit inside bytes32 for low-fee writes.
          </div>
          <button
            type="button"
            className="primary-button"
            disabled={!taskNote.trim() || isPending || isConfirming}
            onClick={handleCreateTask}
          >
            {isPending && txMode === 'single'
              ? 'Confirm in wallet...'
              : isConfirming && txMode === 'single'
                ? 'Creating task...'
                : 'Create task'}
          </button>
        </div>

        <div className="field-row">
          <label className="input-label" htmlFor="batch-notes">
            Batch import notes
          </label>
          <textarea
            id="batch-notes"
            className="text-area"
            value={batchNotes}
            onChange={(event) => setBatchNotes(event.target.value)}
            placeholder={'One task per line\nDraft release notes\nIndex task events'}
          />
          <div className="helper-row">
            {batchItems.length} task{batchItems.length === 1 ? '' : 's'} ready for
            batch creation.
          </div>
          <button
            type="button"
            className="secondary-button"
            disabled={batchItems.length === 0 || isPending || isConfirming}
            onClick={handleBatchCreate}
          >
            {isPending && txMode === 'batch'
              ? 'Confirm batch...'
              : isConfirming && txMode === 'batch'
                ? 'Creating batch...'
                : 'Batch create'}
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`notice-box ${feedbackType ?? ''}`}>
          {feedback}
          {hash ? (
            <>
              <br />
              Tx: {hash}
            </>
          ) : null}
        </div>
      )}
    </section>
  );
}
