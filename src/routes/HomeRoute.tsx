import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { api } from "../api";
import { Card } from "../components/Card";
import { LeafIcon } from "../components/LeafIcon";
import { LinkButton } from "../components/LinkButton";

const pageSize = 5;

const initialNotepadsList = {
  count: 0,
  notepads: [],
} as any;

export function HomeRoute() {
  const [notepadsList, setNotepadsList] = useState(initialNotepadsList);
  const pageCount = Math.ceil(notepadsList.count / pageSize);
  const pages = new Array(pageCount).fill(null).map((_, index) => index + 1);
  async function loadNotepads() {
    const response = await api.get("/notepads");
    const newNotepads = response.data;
    setNotepadsList(newNotepads);
  }

  useEffect(() => {
    loadNotepads();
  }, []);

  return (
    <div className="flex flex-col py-24 gap-4 md:max-w-screen-md md:mx-auto">
      <Helmet>
        <title>Home | Leaf Notepads</title>
      </Helmet>
      {notepadsList.notepads.map((notepad: any) => {
        return (
          <Link to={`ver-notepad/${notepad.id}`}>
            <Card className="hover:opacity-75" key={notepad.id}>
              <div className="flex flex-row">
                <span className="flex-1 text-xs text-gray-500">
                  //{notepad.id}
                </span>
                <LeafIcon className="text-md" />
              </div>
              <span className="text-xs">
                {new Date(notepad.created_at).toLocaleDateString()}
              </span>
              <div className="flex flex-col">
                <h2 className="text-2xl border-b border-amber-800">
                  {notepad.title}
                </h2>
                <p className="border-b text-lg border-amber-800">
                  {notepad.subtitle}
                </p>
              </div>
              <p className="mt-2 mb-2 border-b border-amber-800">
                {notepad.content}
              </p>
            </Card>
          </Link>
        );
      })}
      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <LinkButton key={page} to={`/notepads/${page}`} className="py-1 px-3">
            {page}
          </LinkButton>
        ))}
      </div>
    </div>
  );
}
