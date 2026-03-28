'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useAccount,
  usePublicClient,
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
  STATUS_LABELS,
} from '@/lib/contract';
import { decodeTaskContent } from '@/lib/task-content';

type TaskRecord = {
  id: number;
  note: string;
  status: number;
  owner: `0x${string}`;
};

function getErrorMessage(error: unknown) {
  if (error && typeof error === 'object' && 'shortMessage' in error) {
    return String(error.shortMessage);
  }
  if (error instanceof Error) return error.message;
  return 'Transaction failed.';
}

export function TaskBoard() {
  const { address, chain } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ chainId: CHAIN_ID });
  const [tasks, setTasks] = useState<TaskRecord[]>([]);
  const [queryId, setQueryId] = useState('');
  const [queryResult, setQueryResult] = useState<TaskRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [noticeType, setNoticeType] = useState<'success' | 'error' | null>(null);
  const trackedHashRef = useRef<string | null>(null);

  const { data: hash, writeContract, error, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    chainId: CHAIN_ID,
  });

  const loadTasks = useCallback(async () => {
    if (!address || !publicClient) return;
    setLoading(true);
    try {
      const ids = (await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getUserTasks',
        args: [address],
      })) as bigint[];

      const nextTasks = await Promise.all(
        [...ids].reverse().map(async (taskId) => {
          const [content, status, owner] = (await publicClient.readContract({
            address: CONTRACT_ADDRESS,
            abi: CONTRACT_ABI,
            functionName: 'getTask',
            args: [taskId],
          })) as readonly [`0x${string}`, number, `0x${string}`];

          return {
            id: Number(taskId),
            note: decodeTaskContent(content),
            status: Number(status),
            owner,
          };
        }),
      );

      setTasks(nextTasks);
    } catch (loadError) {
      const message =
        loadError instanceof Error ? loadError.message : 'Unable to load tasks.';
      setNoticeType('error');
      setNotice(message);
    } finally {
      setLoading(false);
    }
  }, [address, publicClient]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    if (!error) return;
    setNoticeType('error');
    setNotice(getErrorMessage(error));
  }, [error]);

  useEffect(() => {
    if (!isSuccess || !hash || trackedHashRef.current === hash) return;
    trackedHashRef.current = hash;
    trackTransaction(APP_TRACKING_ID, APP_NAME, address, hash);
    setNoticeType('success');
    setNotice('Status updated successfully.');
    loadTasks();
  }, [address, hash, isSuccess, loadTasks]);

  const handleStatusUpdate = async (taskId: number, status: number) => {
    if (!address) return;
    if (chain?.id !== CHAIN_ID) {
      try {
        await switchChainAsync({ chainId: CHAIN_ID });
      } catch (switchError) {
        setNoticeType('error');
        setNotice(getErrorMessage(switchError));
        return;
      }
    }
    setNotice(null);
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'updateStatus',
      args: [BigInt(taskId), status],
      chainId: CHAIN_ID,
    });
  };

  const handleInspectTask = async () => {
    if (!publicClient || !queryId.trim()) return;
    const parsedId = Number(queryId);
    if (!Number.isInteger(parsedId) || parsedId < 0) {
      setNoticeType('error');
      setNotice('Task ID must be a non-negative integer.');
      return;
    }

    try {
      const [content, status, owner] = (await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getTask',
        args: [BigInt(parsedId)],
      })) as readonly [`0x${string}`, number, `0x${string}`];

      setQueryResult({
        id: parsedId,
        note: decodeTaskContent(content),
        status: Number(status),
        owner,
      });
    } catch (inspectError) {
      const message =
        inspectError instanceof Error
          ? inspectError.message
          : 'Unable to read task.';
      setNoticeType('error');
      setNotice(message);
    }
  };

  return (
    <section className="panel-card">
      <div className="panel-heading">
        <div>
          <div className="section-kicker">Board</div>
          <h2>Review and update your flow</h2>
        </div>
        <button type="button" className="ghost-button" onClick={() => loadTasks()}>
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <div className="stats-grid">
        <div className="task-item">
          <div className="input-label">Your tasks</div>
          <div className="task-count">{loading ? 'Loading...' : `${tasks.length} total`}</div>
        </div>
        <div className="task-item">
          <div className="input-label">Chain</div>
          <div className="task-count">Base mainnet ({CHAIN_ID})</div>
        </div>
      </div>

      <div className="task-form-stack">
        <div className="field-row">
          <label className="input-label" htmlFor="query-task-id">
            Query any task by ID
          </label>
          <div className="status-row">
            <input
              id="query-task-id"
              className="text-input"
              value={queryId}
              onChange={(event) => setQueryId(event.target.value)}
              placeholder="0"
            />
            <button type="button" className="secondary-button" onClick={handleInspectTask}>
              Inspect task
            </button>
          </div>
        </div>

        {queryResult && (
          <div className="query-result task-item">
            <div className="task-item-head">
              <strong>Task #{queryResult.id}</strong>
              <span className="status-pill">{STATUS_LABELS[queryResult.status] ?? 'Unknown'}</span>
            </div>
            <p className="task-note">{queryResult.note || 'Empty bytes32 note'}</p>
            <div className="contract-code">{queryResult.owner}</div>
          </div>
        )}
      </div>

      {notice && <div className={`notice-box ${noticeType ?? ''}`}>{notice}</div>}

      <div className="task-list">
        {tasks.length === 0 && !loading ? (
          <div className="task-item">
            <p className="support-copy">
              No tasks found yet. Create your first task or batch import a short note list.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <article key={task.id} className="task-item">
              <div className="task-item-head">
                <div>
                  <div className="input-label">Task #{task.id}</div>
                  <p className="task-note">{task.note || 'Empty bytes32 note'}</p>
                </div>
                <span className="status-pill">
                  {STATUS_LABELS[task.status] ?? 'Unknown'}
                </span>
              </div>
              <div className="status-row">
                {STATUS_LABELS.map((label, status) => (
                  <button
                    key={`${task.id}-${label}`}
                    type="button"
                    className={`status-button ${task.status === status ? 'is-active' : ''}`}
                    disabled={isPending || isConfirming || task.status === status}
                    onClick={() => handleStatusUpdate(task.id, status)}
                  >
                    {isPending || isConfirming ? 'Updating...' : label}
                  </button>
                ))}
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
