import { useZorm } from "react-zorm";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-simple-toasts";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { api } from "../api";
import { NotepadSchema } from "../notepadSchema";
import { ErrorMessage } from "../components/ErrorMessage";
import { TextField } from "../components/TextField";
import { BreadCrumbs } from "../components/BreadCrumbs";

const texts = {
  placeholderTitle: "Digite um título",
  placeholderSubtitle: "Digite um subtítulo",
  toastSuccess: "Seu Leaf Notepad foi criado com sucesso!",
  toastError: "Houve um erro ao criar o seu Leaf Notepad =(",
};

export function CreateNotepadRoute() {
  const navigate = useNavigate();
  const zo = useZorm("create-notepad", NotepadSchema, {
    async onValidSubmit(event) {
      event.preventDefault();
      const response = await api.post("/notepads", event.data);
      if (response.data.success) {
        toast(`${texts.toastSuccess}`);
        navigate("/");
      } else {
        toast(`${texts.toastError}`);
      }
    },
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const notepadToCreate = {};
    NotepadSchema.parse(notepadToCreate);
    const response = await api.post("/notepads", notepadToCreate);
    console.log(response.data);
  }

  const titles = {
    title: "Criar notepad",
  };

  return (
    <div>
      <Helmet>
        <title>Criar Leaf Notepad</title>
      </Helmet>
      <BreadCrumbs
        links={[
          {
            href: "/",
            label: "Home",
          },
          {
            href: "/criar-notepad",
            label: "Criar Leaf Notepad",
          },
        ]}
      />
      <form
        ref={zo.ref}
        className="flex flex-col gap-4 px-4 md:max-w-screen-md m-auto mt-14"
      >
        <Title>{titles.title}</Title>
        <div className="flex flex-col mt-8">
          <TextField
            type="text"
            placeholder={texts.placeholderTitle}
            className={`${zo.errors.title(
              "border-red-700 focus:border-red-700"
            )}`}
            name={zo.fields.title()}
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
          />
          {zo.errors.subtitle((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <div className="flex flex-col">
          <textarea
            placeholder="Digite o conteúdo"
            className={`border-b border-gray-400 focus:border-amber-800 py-2 px-1 resize-none outline-none ${zo.errors.content(
              "border-red-700 focus:border-red-700"
            )}`}
            rows={3}
            name={zo.fields.content()}
          />
          {zo.errors.content((error) => (
            <ErrorMessage>{error.message}</ErrorMessage>
          ))}
        </div>
        <Button>Enviar</Button>
      </form>
    </div>
  );
}
