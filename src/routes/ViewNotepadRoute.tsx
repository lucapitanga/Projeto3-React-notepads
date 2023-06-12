import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ImBin as LogoIconDelete } from "react-icons/im";
import { BiEditAlt as LogoIconEdit } from "react-icons/bi";
import toast from "react-simple-toasts";
import { api } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { LinkButton } from "../components/LinkButton";
import { LeafIcon } from "../components/LeafIcon";
import { BreadCrumbs } from "../components/BreadCrumbs";

const initialNotepad: any = [
  {
    id: 0,
    title: "",
    subtitle: "",
    content: "",
    created_at: "",
  },
];

export function ViewNotepadRoute() {
  const params = useParams();
  const navigate = useNavigate();
  const [notepad, setNotepad] = useState(initialNotepad);

  async function loadNotepad() {
    const response = await api.get(`/notepads/${params.id}`);
    const newNotepad = response.data;
    setNotepad(newNotepad);
  }

  async function deleteNotepad() {
    const response = await api.delete(`/notepads/${params.id}`);
    if (response.data.success === true) {
      toast(`O Leaf Notepad //${notepad.id} foi deletado com sucesso!`);
      navigate("/");
    } else {
      toast(`Houve um erro ao deletar o Leaf Notepad ${notepad.id}`);
    }
  }

  useEffect(() => {
    loadNotepad();
  }, [params.id]);

  return (
    <div>
      <Helmet>
        <title>{notepad.title}</title>
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
        ]}
      />
      <Card className="flex flex-col gap-4 mt-24 mb-0 p-8 md:max-w-screen-md md:mx-auto">
        <div className="flex flex-row items-center justify-end">
          <LeafIcon className="text-sm mr-1" />
          <span className="flex-1 text-xs text-gray-500">//{notepad.id}</span>
          <Button
            className="bg-gray-200 hover:bg-amber-800 py-2 rounded-full"
            onClick={deleteNotepad}
          >
            <LogoIconDelete className="text-amber-800 hover:text-white text-xl" />
          </Button>
          <LinkButton
            to={`/editar-notepad/${params.id}`}
            className="bg-gray-200 hover:bg-amber-800 py-2 rounded-full"
          >
            <LogoIconEdit className="text-amber-800 hover:text-white text-xl" />
          </LinkButton>
        </div>
        <span className="text-xs">
          {new Date(notepad.created_at).toLocaleDateString()}
        </span>
        <div className="flex flex-col gap-1 mt-1">
          <h2 className="text-2xl border-b border-amber-800">
            {notepad.title}
          </h2>
          <p className="border-b text-lg border-amber-800">
            {notepad.subtitle}
          </p>
        </div>
        <p className="mt-2 mb-2 border-b border-amber-800">{notepad.content}</p>
      </Card>
    </div>
  );
}
