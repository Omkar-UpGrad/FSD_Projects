import { BrowserRouter, Route, Routes } from "react-router";

import ComponentsAndPropsApp from "./modules/17dec/ComponentsAndPropsApp";
import TextAnalyzerApp from "./modules/18dec/TextAnalyzerApp";
import TodoList from "./modules/19dec/todo-list/TodoList";
import MusicPlayer from "./modules/19dec/music-player/MusicPlayer";
import MusicPlayerView from "./modules/23dec/MusicPlayerView";
import MusicPlaylist from "./modules/23dec/MusicPlaylist";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="components-and-props"
          element={<ComponentsAndPropsApp />}
        />
        <Route path="text-analyzer" element={<TextAnalyzerApp />} />
        <Route path="todo-list" element={<TodoList />} />
        <Route path="music-player" element={<MusicPlayer />} />

        <Route path="23dec">
          <Route path="music-player">
            <Route index element={<MusicPlaylist />} />
            <Route path=":musicId" element={<MusicPlayerView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
