import ManagementLayout from '../../components/ManagementLayout';
import ProjectForm from '../../components/ProjectForm';
export default function Create() {
  return <ManagementLayout title="Add a project" description="Create a case file that will appear immediately in the public Projects section after saving."><ProjectForm /></ManagementLayout>;
}
