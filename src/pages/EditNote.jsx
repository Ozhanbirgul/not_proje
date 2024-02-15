import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import useCreateDate from "../components/useCreateDate";

const EditNote = ({ notes, setNotes }) => {
  const { id } = useParams();
  const note = notes.find((item) => item.id === id);

  // State kullanarak title ve details bilgilerini saklamak
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const date = useCreateDate();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDetails(note.details);
    }
  }, [note]);

  // title ve detail değiştiğinde çalışır
  const handleForm = (e) => {
    e.preventDefault();
    if (title && details) {
      const newNote = { ...note, title, details, date };

      const newNotes = notes.map((item) => (item.id === id ? newNote : item));
      setNotes(newNotes);
      navigate("/");
    } else {
      // Başlık veya detayların boş olma durumunu ele almak isteyebilirsiniz.
      console.log("Başlık ve detay boş olamaz");
    }
  };

  // notu silme fonksiyonu
  const handleDelete = () => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      const newNotes = notes.filter((item) => item.id !== id);
      setNotes(newNotes);
      navigate("/");
    }
  };

  if (!note) {
    // Note bulunamadıysa hata mesajını göster
    return <div>Not bulunamadı.</div>;
  }

  return (
    <section>
      <header className="create-note__header">
        <Link to="/" className="btn">
          <IoIosArrowBack />
        </Link>
        <button className="btn lg primary" onClick={handleForm}>
          Kaydet
        </button>
        <button className="btn lg danger" onClick={handleDelete}>
          <MdDelete />
        </button>
      </header>
      <form className="create-note__form" onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Başlık"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          rows="28"
          placeholder="Not detayı..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        ></textarea>
      </form>
    </section>
  );
};

export default EditNote;
