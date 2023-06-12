import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useZorm } from "react-zorm";
import { Helmet } from "react-helmet";
import toast from "react-simple-toasts";
import { api } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { TextField } from "../components/TextField";
import { ErrorMessage } from "../components/ErrorMessage";
import { NotepadSchema } from "../notepadSchema";
import { BreadCrumbs } from "../components/BreadCrumbs";

const texts = {
  title: "Editar Notepad",
  placeholderTitle: "Digite um título",
  placeholderSubtitle: "Digite um subtítulo",
  placeholderContent: "Digite o conteúdo",
  submit: "Enviar",
  toastSuccess: "Seu Leaf Notepad foi editado com sucesso!",
  toastError: "Houve um erro ao editar o seu Leaf Notepad =(",
};

const initialNotepad = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

export function EditNotepadRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [initialTitleState, setTitleState] = useState(initialNotepad.title);
  const [initialSubtitleState, setSubtitleState] = useState(
    initialNotepad.subtitle
  );
  const [initialContentState, setContentState] = useState(
    initialNotepad.content
  );
  const zo = useZorm("edit-notepad", NotepadSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await api.patch(`/notepads/${params.id}`, event.data);
      if (response.data.success) {
        toast(`${texts.toastSuccess}`);
        navigate(`/ver-notepad/${params.id}`);
      } else {
        toast(`${texts.toastError}`);
      }
    },
  });

  async function loadNotepad() {
    const response = await api.get(`/notepads/${params.id}`);
    setTitleState(response.data);
    setSubtitleState(response.data);
    setContentState(response.data);
  }

  useEffect(() => {
    loadNotepad();
  }, [params.id]);

  return (
    <div>
      <Helmet>
        <title>Editar Leaf Notepad ${params.id}</title>
      </Helmet>
      <BreadCrumbs
        links={[
          {
            href: "/",
            label: "Home",
          },
          {
            href: `/ver-notepad/${params.id}`,
            label: `Ver Leaf Notepad //${params.id}`,
          },
          {
            href: `/editar-notepad/${params.id}`,
            label: `Editar Leaf Notepad //${params.id}`,
          },
        ]}
      />
      <Card className="flex flex-col gap-4 bg-white border-none md:max-w-screen-md md:mx-auto">
        <form ref={zo.ref} className="flex flex-col gap-4 px-4 mt-14">
          <Title>
            {texts.title} //{params.id}
          </Title>
          <div className="flex flex-col">
            <TextField
              type="text"
              placeholder={texts.placeholderTitle}
              className={`${zo.errors.title(
                "border-red-700 focus:border-red-700"
              )}`}
              name={zo.fields.title()}
              defaultValue={initialTitleState}
            />
            {zo.errors.title((error) => (
              <ErrorMessage>{error.message}</ErrorMessage>
            ))}
          </div>
          <div className="flex flex-col">
            <TextField
              type="text"
              placeholder={texts.placeholderSubtitle}
              className={`${zo.errors.subtitle(
                "border-red-700 focus:border-red-700"
              )}`}
              name={zo.fields.subtitle()}
              defaultValue={initialSubtitleState}
            />
            {zo.errors.subtitle((error) => (
              <ErrorMessage>{error.message}</ErrorMessage>
            ))}
          </div>
          <div className="flex flex-col">
            <textarea
              placeholder={texts.placeholderContent}
              className={`border-b border-gray-400 focus:border-amber-800 py-2 px-1 resize-none outline-none ${zo.errors.content(
                "border-red-700 focus:border-red-700"
              )}`}
              rows={3}
              name={zo.fields.content()}
              defaultValue={initialContentState}
            />
            {zo.errors.content((error) => (
              <ErrorMessage>{error.message}</ErrorMessage>
            ))}
          </div>
          <Button>{texts.submit}</Button>
        </form>
      </Card>
    </div>
  );
}
