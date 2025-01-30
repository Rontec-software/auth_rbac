import { PerfilForm } from '@/components/perfil/form/PerfilForm';

export default function EditarPerfil({
  params,
}: {
  params: { edit: string };
}) {
  return <PerfilForm edit={params.edit} />;
}
