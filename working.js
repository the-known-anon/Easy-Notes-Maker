const template = `
    <button id="CopyButtonOnPage">
      <svg class  = "button_des"  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.08V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h6"/><path d="M14 3v5h5M18 21v-6M15 18h6"/></svg></button>
     </button>
     <button id="SaveButtonOnPage">
    <svg class = "button_des" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v13M5 12l7 7 7-7"/></svg>
    </button>
`
var text1 = '';
localStorage.setItem("notes", " ");
const styled = ({ display = "none", left = 0, top = 0 }) => `
  #CopyButtonOnPage {
    align-items: center;
    background-color: #e6ccff;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    z-index: 9999;
  }
  .button_des {
    fill: white;
  }
  .button_des:hover {
    fill: black;
  }
   
`;
const styled1 = ({ display = "none", left = 0, top = 0 }) => `
  #SaveButtonOnPage {
    align-items: center;
    background-color: #e6ccff;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    z-index: 9999;
  }
  .button_des {
    fill: white;
  }
  .button_des:hover {
    fill: black;
  }
   
`;
class CopyButton extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    get CopyButtonPosition() {
        return JSON.parse(this.getAttribute("copy_pos") || "{}");
    }

    get styleElement() {
        return this.shadowRoot.querySelector("style");
    }


    static get observedAttributes() {
        return ["copy_pos"];
    }

    render() {
        this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = styled({});
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML += template;
        this.shadowRoot
            .getElementById("CopyButtonOnPage")
            .addEventListener("click", () => this.AddText());
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "copy_pos") {
            this.styleElement.textContent = styled(this.CopyButtonPosition);
        }
    }

    AddText() {
        var selected_text = window.getSelection();
       // alert(selected_text);
        var temp = localStorage.getItem("notes") ;

                text1 = temp + '\n' + selected_text;


        localStorage.setItem("notes", text1);

        window.getSelection().empty();
    }

}

window.customElements.define("copy-button", CopyButton);



class SaveButton extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    get SaveButtonPosition() {
        return JSON.parse(this.getAttribute("save_pos") || "{}");
    }

    get styleElement() {
        return this.shadowRoot.querySelector("style");
    }


    static get observedAttributes() {
        return ["save_pos"];
    }

    render() {
        this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = styled1({});
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML += template;
        this.shadowRoot
            .getElementById("SaveButtonOnPage")
            .addEventListener("click", () => this.download("Notes.txt",text1));
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "save_pos") {
            this.styleElement.textContent = styled1(this.SaveButtonPosition);
        }
    }

    download(filename, text){
        var selected_text = window.getSelection();
        //alert(selected_text);
        var temp = localStorage.getItem("notes") ;
        text = temp + '\n' + selected_text;

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();
        localStorage.removeItem("notes");
        document.body.removeChild(element);


    }



}

window.customElements.define("save-button", SaveButton);

