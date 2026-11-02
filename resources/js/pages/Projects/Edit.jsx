import ManagementLayout from '../../components/portfolio/management/ManagementLayout';
import ProjectForm from '../../components/portfolio/management/ProjectForm';
export default function Edit({project}) {
  return <ManagementLayout title="Edit project" description={`Updating: ${project.title}`}><ProjectForm project={project}/></ManagementLayout>;
}
