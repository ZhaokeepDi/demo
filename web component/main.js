customElements.define('person-details',
  class extends HTMLElement {
    constructor() {
      super();
    //获取模板（template标签并不会被渲染，可以用来保存数据）
      const template = document.getElementById('person-template');
    //获取元素内容
      const templateContent = template.content;
    // 创建一个根元素shadowRoot，mode{open/close(内部实现无法被 JavaScript 访问及修改 — 也就是说将该实现不公开)}
      const shadowRoot = this.attachShadow({mode: 'open'});
    // 创建style（只对组件内元素生效）
      const style = document.createElement('style');
    // style的内容
      style.textContent = `
        div { padding: 10px; border: 1px solid gray; width: 200px; margin: 10px; }
        h2 { margin: 0 0 10px; }
        ul { margin: 0; }
        p { margin: 10px 0; color:red}
      `;
    //向根节点追加内容
      shadowRoot.appendChild(style);
    //组件下自行创建插槽
      const slot=document.createElement('slot')
      slot.name="title"
      shadowRoot.appendChild(slot)
    //实例化模板,使用深度克隆
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }

    //生命周期函数，能访问自定义元素本身，但是修改不了constructor里的属性
    //创建
    connectedCallback() {
        console.log(this.children)
        console.log('被添加到页面');
    }
    // 销毁
    disconnectedCallback() {
        console.log('被移除（销毁）');
    }
    // 移动
    adoptedCallback() {
        console.log('移动到新的页面');

    }
    // 更改
    attributeChangedCallback(name, oldValue, newValue) {
    console.log('属性发生更改.');
    }
  }
);

customElements.define('edit-word',
  class extends HTMLElement {
    constructor() {
      super();
        // 创建元素
      const shadowRoot = this.attachShadow({mode: 'open'});
      const form = document.createElement('form');
      const input = document.createElement('input');
      const span = document.createElement('span');
     
        // 创建style
      const style = document.createElement('style');
      style.textContent = 'span { background-color: #eef; padding: 0 2px }';
        // 实例化元素
      shadowRoot.appendChild(style);
      shadowRoot.appendChild(form);
      shadowRoot.appendChild(span);
        // 添加元素内容
      span.textContent = this.textContent;
      input.value = this.textContent;
        // 实例化元素并设置样式
      form.appendChild(input);
      form.style.display = 'none';
      span.style.display = 'inline-block';
      input.style.width = span.clientWidth + 'px';
        // 设置属性
      this.setAttribute('tabindex', '0');
      input.setAttribute('required', 'required');
      this.style.display = 'inline-block';
        // 添加监听
      this.addEventListener('click', () => {
        span.style.display = 'none';
        form.style.display = 'inline-block';
        input.focus();
        input.setSelectionRange(0, input.value.length)
      });

      form.addEventListener('submit', e => {
        updateDisplay();
        e.preventDefault();
      });

      input.addEventListener('blur', updateDisplay);
      //监听事件里的回调
      function updateDisplay() {
        span.style.display = 'inline-block';
        form.style.display = 'none';
        span.textContent = input.value;
        input.style.width = span.clientWidth + 'px';
      }
    }
  }
);