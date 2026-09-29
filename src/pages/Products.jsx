import { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultGames = [
  {
    id: 1,
    title: "Shadow Strike",
    genre: "Action",
    platform: "PC",
    price: 2500,
  },
  {
    id: 2,
    title: "Racing Legends",
    genre: "Racing",
    platform: "PC / PS5",
    price: 3000,
  },
  {
    id: 3,
    title: "Kingdom Warriors",
    genre: "Adventure",
    platform: "PC / Xbox",
    price: 3500,
  },
];

function Products() {
  const navigate = useNavigate();

  const [games, setGames] = useState(() => {
    const savedGames = localStorage.getItem("games");

    if (savedGames) {
      return JSON.parse(savedGames);
    }

    return defaultGames;
  });

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");
  const [price, setPrice] = useState("");

  const [editingId, setEditingId] = useState(null);

  function saveGames(newGames) {
    setGames(newGames);

    localStorage.setItem(
      "games",
      JSON.stringify(newGames)
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!title || !genre || !platform || !price) {
      alert("Please fill in all fields");
      return;
    }

    if (editingId) {
      const updatedGames = games.map((game) => {
        if (game.id === editingId) {
          return {
            ...game,
            title: title,
            genre: genre,
            platform: platform,
            price: Number(price),
          };
        }

        return game;
      });

      saveGames(updatedGames);
    } else {
      const newGame = {
        id: Date.now(),
        title: title,
        genre: genre,
        platform: platform,
        price: Number(price),
      };

      saveGames([...games, newGame]);
    }

    clearForm();
  }

  function editGame(game) {
    setEditingId(game.id);

    setTitle(game.title);
    setGenre(game.genre);
    setPlatform(game.platform);
    setPrice(game.price);
  }

  function deleteGame(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this game?"
    );

    if (!confirmed) {
      return;
    }

    const updatedGames = games.filter(
      (game) => game.id !== id
    );

    saveGames(updatedGames);
  }

  function clearForm() {
    setTitle("");
    setGenre("");
    setPlatform("");
    setPrice("");
    setEditingId(null);
  }

  function logout() {
    localStorage.removeItem("loggedIn");
    navigate("/signin");
  }

  return (
    <div className="products-page">

      <header className="navbar">
        <h1>PixelForge Studios</h1>

        <button
          onClick={logout}
          className="logout-button"
        >
          Logout
        </button>
      </header>

      <main className="products-container">

        {/* GAME FORM */}

        <section className="form-section">

          <h2>
            {editingId
              ? "Edit Game"
              : "Add New Game"}
          </h2>

          <form onSubmit={handleSubmit}>

            <label>Game Title</label>

            <input
              type="text"
              placeholder="Enter game title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <label>Genre</label>

            <input
              type="text"
              placeholder="e.g. Action"
              value={genre}
              onChange={(e) =>
                setGenre(e.target.value)
              }
            />

            <label>Platform</label>

            <input
              type="text"
              placeholder="e.g. PC"
              value={platform}
              onChange={(e) =>
                setPlatform(e.target.value)
              }
            />

            <label>Price</label>

            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            <div className="form-buttons">

              <button type="submit">
                {editingId
                  ? "Update Game"
                  : "Add Game"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={clearForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>
        </section>


        {/* GAME LIST */}

        <section className="list-section">

          <h2>Our Games</h2>

          {games.length === 0 ? (
            <p>No games available.</p>
          ) : (

            <div className="game-list">

              {games.map((game) => (

                <div
                  className="game-card"
                  key={game.id}
                >

                  <div className="game-info">

                    <h3>{game.title}</h3>

                    <p>
                      <strong>Genre:</strong>{" "}
                      {game.genre}
                    </p>

                    <p>
                      <strong>Platform:</strong>{" "}
                      {game.platform}
                    </p>

                    <p>
                      <strong>Price:</strong>{" "}
                      KSh{" "}
                      {game.price.toLocaleString()}
                    </p>

                  </div>

                  <div className="game-actions">

                    <button
                      className="edit-button"
                      onClick={() =>
                        editGame(game)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteGame(game.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Products;