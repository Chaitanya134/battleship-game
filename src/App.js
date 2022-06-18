import Board from "./components/Board";
import Ships from "./components/Ships";
import './scss/style.scss';
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

function App() {
  return (
    <div>
      <h1>Battleship</h1>
      <DndProvider options={HTML5toTouch}>
        <Ships />
        <Board />
      </DndProvider>
    </div>
      );
}

export default App;
