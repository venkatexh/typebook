import { useActions } from "../hooks/use-actions";
import "./action-bar.css";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button className="button is-primary" onClick={() => moveCell(id, "up")}>
        <span className="icon is-small">
          <i className="fas fa-arrow-up"></i>
        </span>
      </button>
      <button
        className="button is-primary"
        onClick={() => moveCell(id, "down")}
      >
        <span className="icon is-small">
          <i className="fas fa-arrow-down"></i>
        </span>
      </button>
      <button className="button is-primary" onClick={() => deleteCell(id)}>
        <span className="icon is-small">
          <i className="fas fa-times"></i>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
