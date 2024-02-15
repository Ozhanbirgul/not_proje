import React from "react";
import { Link } from "react-router-dom";

const NoteItem = ({ note }) => {
  // note.title veya note.date boşsa varsayılan değer ataması yapılır
  const title = note.title || "Başlık Yok";
  const formattedDate = note.date || "Tarih Yok";

  return (
    <Link to={`/edit-note/${note.id}`} className="note">
      <h4>
        {title.length > 30 ? title.substr(0, 30) + "..." : title}
      </h4>
      <p>{formattedDate}</p>
    </Link>
  );
};

export default NoteItem;
