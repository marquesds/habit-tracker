import React, {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useState,
} from "react";
import axios from "axios";

export default function GoalForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", unit: "", quantity: 0 });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    setFormData({ ...formData, [inputElement.name]: inputElement.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/habits", formData);
      console.log(response.data);
      closeModal();
    } catch (error) {
      console.error("Error ao adicionar hábito", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center mx-auto p-3">
      <button
        className="bg-gray-700 hover:bg-gray-600 text-white mx-0 border border-gray-600 rounded-full shadow-xl flex items-center justify-center w-10 h-10"
        onClick={openModal}
      >
        +
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h1 className="font-medium text-xl">Adicionar novo hábito</h1>
            <form
              className="flex flex-col items-center justify-center"
              onSubmit={handleSubmit}
            >
              <label className="flex flex-col items-center justify-center">
                Nome
                <input
                  className="border border-gray-400 rounded-md p-2 m-2"
                  type="text"
                  name="name"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col items-center justify-center">
                Unidade de medida
                <input
                  className="border border-gray-400 rounded-md p-2 m-2"
                  type="text"
                  name="unit"
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col items-center justify-center">
                Quantidade
                <input
                  className="border border-gray-400 rounded-md p-2 m-2"
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                />
              </label>
              <button
                className="border border-gray-400 rounded-md p-2 m-2"
                type="submit"
              >
                Adicionar
              </button>
            </form>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
