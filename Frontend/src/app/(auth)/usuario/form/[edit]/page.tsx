import { UsuarioForm } from '@/components/usuario/form/UsuarioForm';

export default function EditarUsuario({
  params,
}: {
  params: { edit: string };
}) {
  return <UsuarioForm edit={params?.edit} />;
}
