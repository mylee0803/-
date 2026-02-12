---
description: Build and deploy the application to Vercel via GitHub
---

# Deploy Workflow

This workflow automatically builds the project to verify integrity, then commits changes and pushes to GitHub to trigger Vercel deployment.

1.  **Build Verification**: Validates generic build success (TypeScript + Vite).
2.  **Git Operations**: Stages all changes, commits with a message, and pushes to `main`.

## Usage

You can trigger this workflow by running:
`npm run deploy`

Or asking the assistant to "deploy the app".

## Steps

// turbo
1. Run the deploy script
   ```bash
   npm run deploy
   ```
