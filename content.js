const CopyButtonConst = document.createElement("copy-button");
document.body.appendChild(CopyButtonConst);
const SaveButtonConst = document.createElement("save-button");
document.body.appendChild(SaveButtonConst);

const set_copy_pos = (copy_pos) =>
    CopyButtonConst.setAttribute(
        "copy_pos",
        JSON.stringify(copy_pos)
    );


const text = () => window.getSelection().toString();


const set_save_pos = (save_pos) =>
    SaveButtonConst.setAttribute(
        "save_pos",
        JSON.stringify(save_pos)
    );


document.addEventListener("click", () => {
    if (text().length > 0) {
        set_copy_pos(get_copy_pos());
        set_save_pos(get_save_pos());
    }
});



document.addEventListener("selectionchange", () => {
    if (text().length === 0) {
        set_copy_pos({display: "none"});
        set_save_pos({display: "none"});
    }
});

function get_copy_pos() {
    const temp = window.getSelection().getRangeAt(0).getBoundingClientRect();
    return {
        left: temp.left + temp.width / 2 - 20,
        top: temp.top - 30,
        display: "flex",
    };
}
function get_save_pos() {
    const temp = window.getSelection().getRangeAt(0).getBoundingClientRect();
    return {
        left: temp.left + temp.width / 2 +23,
        top: temp.top - 30,
        display: "flex",
    };
}
