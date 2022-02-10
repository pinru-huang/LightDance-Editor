import { useState } from "react";
// mui
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// states and actions
import {
  saveCurrentStatus,
  deleteCurrentStatus,
  saveCurrentFade,
} from "../../core/actions";

// components
import SelectDancer from "./SelectDancer";
import ElEditor from "./ElEditor";
import LedEditor from "./LedEditor";
import ModeSelector from "./ModeSelector";
import Fade from "./Fade";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
  },
  selectDancer: {
    position: "fixed",
  },
  switches: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  grow: {
    flexGrow: 1,
  },
  fixed: {
    position: "fixed",
  },
}));

/**
 * LightEditor
 */
export default function LightEditor() {
  // styles
  const classes = useStyles();

  // switch between ElEditor and LedEditor
  const ELEDITOR = "EL Editor";
  const LEDEDITOR = "Led Editor";
  const [editor, setEditor] = useState(ELEDITOR);
  const handleChangeEditor = () => {
    setEditor(editor === ELEDITOR ? LEDEDITOR : ELEDITOR);
  };

  // save
  const handleSave = () => {
    saveCurrentStatus();
    saveCurrentFade();
  };
  // delete
  const handleDelete = () => {
    if (window.confirm(`Are you sure to delete ?`)) {
      deleteCurrentStatus();
    }
  };

  // TODO: make ModeSelector and  selectDancer fixed position
  return (
    <div id="editor" className={classes.root}>
      <div>
        <ModeSelector handleSave={handleSave} handleDelete={handleDelete} />
        <SelectDancer className={classes.selectDancer} />
      </div>
      <div className={classes.grow}>
        <div>
          <div className={classes.switches}>
            <Button variant="text" onClick={handleChangeEditor}>
              {editor}
            </Button>
            <Fade />
          </div>
          {editor === ELEDITOR ? <ElEditor /> : <LedEditor />}
        </div>
      </div>
    </div>
  );
}