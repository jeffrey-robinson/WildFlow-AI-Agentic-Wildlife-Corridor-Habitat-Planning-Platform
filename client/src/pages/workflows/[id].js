import React, { useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import { useRouter } from 'next/router';
import { useWorkflowStore } from '../../store/workflowStore';
import WorkflowCanvas from '../../components/Canvas/WorkflowCanvas';

export default function WorkflowEditorPage() {
  const router = useRouter();
  const { id } = router.query;
  const { currentWorkflow, fetchWorkflowById, loading } = useWorkflowStore();

  useEffect(() => {
    if (id) {
      fetchWorkflowById(id);
    }
  }, [id, fetchWorkflowById]);

  return (
    <ProtectedRoute>
      <div className="h-full w-full">
        <WorkflowCanvas workflowData={currentWorkflow} />
      </div>
    </ProtectedRoute>
  );
}
