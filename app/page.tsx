'use client';

import { useAccount } from 'wagmi';
import { ConnectWallet } from '@/components/ConnectWallet';
import { TaskComposer } from '@/components/TaskComposer';
import { TaskBoard } from '@/components/TaskBoard';
import {
  APP_DESCRIPTION,
  APP_NAME,
  APP_TRACKING_ID,
  BASE_BUILDER_CODE,
  CONTRACT_ADDRESS,
} from '@/lib/contract';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="min-h-screen">
      <div className="page-shell">
        <header className="hero-card">
          <div className="hero-copy">
            <div className="eyebrow">Base Mini App</div>
            <h1>{APP_NAME}</h1>
            <p>{APP_DESCRIPTION}</p>
            <div className="hero-meta">
              <span>Task + Note Flow</span>
              <span>Low-fee Base mainnet writes</span>
              <span>Event-driven contract reads</span>
            </div>
          </div>
          <div className="hero-actions">
            <ConnectWallet />
            <div className="meta-panel">
              <div>
                <span className="meta-label">Contract</span>
                <code>{CONTRACT_ADDRESS}</code>
              </div>
              <div>
                <span className="meta-label">Tracking ID</span>
                <code>{APP_TRACKING_ID}</code>
              </div>
              <div>
                <span className="meta-label">Builder Code</span>
                <code>{BASE_BUILDER_CODE || 'Pending input'}</code>
              </div>
            </div>
          </div>
        </header>

        <section className="info-grid">
          <article className="info-card">
            <h2>Record concise onchain notes</h2>
            <p>
              Every task stores a compressed bytes32 note so the app stays fast,
              portable, and cheap to update on Base.
            </p>
          </article>
          <article className="info-card">
            <h2>Update status in one tap</h2>
            <p>
              Move tasks from Todo to Doing to Done with direct contract writes
              using Coinbase Wallet or any injected wallet.
            </p>
          </article>
          <article className="info-card">
            <h2>Attribution-ready launches</h2>
            <p>
              Production metadata, open graph tags, manifest, and transaction
              tracking are wired for Base mini app distribution.
            </p>
          </article>
        </section>

        {!isConnected ? (
          <section className="empty-state">
            <h2>Connect a wallet to start using BaseFlow</h2>
            <p>
              You can create a single task, batch import tasks, inspect any task
              by ID, and update your own task statuses from this page.
            </p>
          </section>
        ) : (
          <section className="workspace-grid">
            <TaskComposer />
            <TaskBoard />
          </section>
        )}
      </div>
    </main>
  );
}
