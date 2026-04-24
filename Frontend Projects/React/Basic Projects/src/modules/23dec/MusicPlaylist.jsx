import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router";

function MusicPlaylist() {
  return (
    <div className="flex flex-col">
      <section className="w-full max-w-sm my-4 mx-auto">
        <h3 className="font-semibold text-2xl">Playlist</h3>

        <div className="mt-4">
          <ul className="border rounded-md border-gray-300">
            <li className="p-4 flex items-center border-b border-gray-300">
              <div>
                <h4>Song 1</h4>
                <p className="text-xs">Artist 1, Artist 2</p>
              </div>

              <div className="ml-auto">
                <Link
                  to="/23dec/music-player/1"
                  className="w-10 h-10 grid place-items-center border border-gray-400 rounded-full"
                >
                  <FaPlay />
                </Link>
              </div>
            </li>
            <li className="p-4 flex items-center border-b border-gray-300">
              <div>
                <h4>Song 2</h4>
                <p className="text-xs">Artist 1, Artist 2</p>
              </div>

              <div className="ml-auto">
                <Link
                  to="/23dec/music-player/2"
                  className="w-10 h-10 grid place-items-center border border-gray-400 rounded-full"
                >
                  <FaPlay />
                </Link>
              </div>
            </li>
            <li className="p-4 flex items-center border-b border-gray-300">
              <div>
                <h4>Song 3</h4>
                <p className="text-xs">Artist 1, Artist 2</p>
              </div>

              <div className="ml-auto">
                <Link
                  to="/23dec/music-player/3"
                  className="w-10 h-10 grid place-items-center border border-gray-400 rounded-full"
                >
                  <FaPlay />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default MusicPlaylist;
