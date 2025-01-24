import { UsuarioForm } from '@/components/page/usuario/form/UsuarioForm';

export default function EditarUsuario({
  params,
}: {
  params: { edit: string };
}) {
  return <UsuarioForm edit={params.edit} />;
}
