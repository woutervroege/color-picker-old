import { LitElement, html } from 'lit-element';
import '@polymer/polymer/lib/elements/dom-repeat';

/**
 * `color-picker`
 * 
 *
 * @customElement
 * @demo demo/index.html
 */
class ColorPicker extends LitElement {
  static get properties() {
    return {

      color: {
        type: String,
      },

      colors: {
        type: Array,
      },

      active: {
        type: Boolean,
        reflect: true,
      },

      autohide: {
        type: Boolean,
      }

    };
  }

  constructor() {
    super();
    this.colors = ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373', '#ef5350', '#f44336', '#e53935', '#d32f2f', '#c62828', '#b71c1c', '#fce4ec', '#f8bbd0', '#f48fb1', '#f06292', '#ec407a', '#e91e63', '#d81b60', '#c2185b', '#ad1457', '#880e4f', '#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0', '#8e24aa', '#7b1fa2', '#6a1b9a', '#4a148c', '#ede7f6', '#d1c4e9', '#b39ddb', '#9575cd', '#7e57c2', '#673ab7', '#5e35b1', '#512da8', '#4527a0', '#311b92', '#e8eaf6', '#c5cae9', '#9fa8da', '#7986cb', '#5c6bc0', '#3f51b5', '#3949ab', '#303f9f', '#283593', '#1a237e', '#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1', '#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b', '#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064', '#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac', '#26a69a', '#009688', '#00897b', '#00796b', '#00695c', '#004d40', '#e8f5e9', '#c8e6c9', '#a5d6a7', '#81c784', '#66bb6a', '#4caf50', '#43a047', '#388e3c', '#2e7d32', '#1b5e20', '#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581', '#9ccc65', '#8bc34a', '#7cb342', '#689f38', '#558b2f', '#33691e', '#f9fbe7', '#f0f4c3', '#e6ee9c', '#dce775', '#d4e157', '#cddc39', '#c0ca33', '#afb42b', '#9e9d24', '#827717', '#fffde7', '#fff9c4', '#fff59d', '#fff176', '#ffee58', '#ffeb3b', '#fdd835', '#fbc02d', '#f9a825', '#f57f17', '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00', '#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800', '#fb8c00', '#f57c00', '#ef6c00', '#e65100', '#fbe9e7', '#ffccbc', '#ffab91', '#ff8a65', '#ff7043', '#ff5722', '#f4511e', '#e64a19', '#d84315', '#bf360c', '#efebe9', '#d7ccc8', '#bcaaa4', '#a1887f', '#8d6e63', '#795548', '#6d4c41', '#5d4037', '#4e342e', '#3e2723', '#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd', '#9e9e9e', '#757575', '#616161', '#424242', '#212121']
    this.active = false;
    this.autohide = false;
  }

  updated(props) {
    super.updated();
    if(props.has('active')) this._activeChanged(this.active);
  }

  _handleFocus() {
    this.active = true;
  }

  _handleBlur() {
    this.active = false;
  }

  _activeChanged(active) {
    var element = this.shadowRoot.querySelector('#container');
    if(!element) return;
    if(active === true) {
      element.focus();
    } else {
      element.blur();
    }
  }

  _handleColorTap(evt) {
    var color = evt.target.dataset.color;
    this.color = color;
    this.active = false;
  }

  _isEqual(a, b) {
    return a == b;
  }

  render() {
    return html`
      <style>
        :host {
          display: inline;
          transform-origin: 0 0;
          transform: rotate(90deg) scaleY(-1);
        }

        section {
          display: none;
          outline: none;
        }

        :host([active]) section {
          display: inline;
        }

        #grid {
          display: flex;
          flex-wrap: wrap;
          max-width: calc(var(--color-picker-column-count, 10) * var(--color-picker-item-size, 20px));
        }

        .color {
          min-width: var(--color-picker-item-size, 20px);
          min-height: var(--color-picker-item-size, 20px);
          cursor: pointer;
          transition: 0.2s transform ease;
          transform-origin: 50% 50%;
        }

        .color:hover,
        .color:active,
        .color[data-selected] {
          transform: scale(1.3, 1.3);
        }
      </style>

      <section
        id="container"
        tabindex="1"
        @focus="${this._handleFocus}"
        @blur="${this._handleBlur}"
      >
        <div id="grid">
          ${this.colors.map((option) => {
            return html`
              <div
                class="color"
                data-color="${option}"
                ?data-selected="${this._isEqual(this.color, option)}"
                style="background-color:${option};"
                @click="${this._handleColorTap}"
              ></div>
            `
          })}
        </div>
      </section>
    `
  }

}

window.customElements.define('color-picker', ColorPicker);