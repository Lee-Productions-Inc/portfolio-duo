import ManagementLayout from '../../components/ManagementLayout';
import ProjectForm from '../../components/ProjectForm';
export default function Edit({project}) {
  return <ManagementLayout title="Edit project" description={`Updating: ${project.title}`}><ProjectForm project={project}/></ManagementLayout>;
}
