import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const questions = [
  {
    id: 'react-core',
    category: 'React Core & Hooks',
    category_es: 'Fundamentos de React y Hooks',
    qa: [
      {
        q: 'What is JSX and why do we use it in React?',
        q_es: '¿Qué es JSX y por qué se utiliza en React?',
        a: `<p><b>EN:</b> JSX looks like HTML, but it is inside a JavaScript file. It's a special syntax that lets us write what our components look like in a very clear way. A tool called Babel changes this "HTML-like" code into real React code (<code>React.createElement</code> functions). We use it because it's easier to read and write the UI of our components.</p>`,
        a_es: `<p><b>ES:</b> JSX (JavaScript XML) es una extensión de sintaxis para JavaScript que permite escribir código similar a HTML dentro de un archivo JavaScript. No es HTML ni JavaScript puro, sino una combinación que se transpila (convierte) a llamadas de funciones <code>React.createElement()</code> mediante herramientas como Babel. Su principal ventaja es que hace que la creación de la UI sea más declarativa, visual e intuitiva, asemejándose a la estructura final del DOM.</p>`,
      },
      {
        q: 'What is the difference between state and props?',
        q_es: '¿Cuál es la diferencia entre state y props en React?',
        a: `<p><b>EN:</b> <b>Props</b> are like settings that a parent component gives to a child component. The child component cannot change its props; it can only read them. <b>State</b> is data that a component manages for itself, inside the component. The component can change its own state. When the state changes, the component re-renders to show the new information. So, props come from the outside, and state is managed on the inside.</p>`,
        a_es: `<p><b>ES:</b> <b>Props</b> (propiedades) son datos que un componente padre pasa a sus componentes hijos. Son inmutables (solo lectura) para el componente hijo. Sirven para configurar y comunicar datos hacia abajo en el árbol de componentes. <b>State</b> (estado) es un conjunto de datos que un componente gestiona internamente. Es mutable (puede cambiar) a través de la función <code>setState</code>. Cuando el estado cambia, React vuelve a renderizar el componente para reflejar los nuevos datos. En resumen: props son para pasar datos desde fuera, state es para gestionar datos internos del componente.</p>`,
      },
      {
        q: 'What is the Virtual DOM and how does it make React fast?',
        q_es: '¿Qué es el Virtual DOM y cómo mejora el rendimiento de React?',
        a: `<p><b>EN:</b> The Virtual DOM is a copy of the real DOM that React keeps in memory. When we change the state of a component, React first updates this copy. Then, it compares the new copy with the old copy to see what exactly changed. This process is called "diffing". Finally, React only updates the parts of the real DOM that actually changed. This is much faster than re-creating the entire real DOM every time.</p>`,
        a_es: `<p><b>ES:</b> El Virtual DOM es una copia en memoria de la estructura del DOM real. Cuando el estado de un componente cambia, React no modifica el DOM del navegador directamente. En su lugar, crea un nuevo Virtual DOM y lo compara con la versión anterior (un proceso llamado "diffing" o reconciliación). Luego, calcula la forma más eficiente de aplicar solo los cambios necesarios en el DOM real. Esto minimiza las costosas manipulaciones directas del DOM, mejorando significativamente el rendimiento.</p>`,
      },
      {
        q: 'What are hooks in React? Name some examples.',
        q_es: '¿Qué son los hooks en React? Nombra algunos ejemplos.',
        a: `<p><b>EN:</b> Hooks are special functions that let you "hook into" React features from functional components. For example, you can use state or other React features without writing a class. Some common hooks are: <code>useState</code> (to add state), <code>useEffect</code> (to run side effects, like fetching data), and <code>useContext</code> (to use context).</p>`,
        a_es: `<p><b>ES:</b> Los hooks son funciones especiales que permiten a los componentes funcionales "engancharse" a características de React, como el estado y el ciclo de vida, que antes solo estaban disponibles en componentes de clase. Ejemplos comunes: <code>useState</code> (para añadir estado local), <code>useEffect</code> (para manejar efectos secundarios como llamadas a API o suscripciones), <code>useContext</code> (para consumir un contexto), <code>useReducer</code>, <code>useCallback</code>, <code>useMemo</code>, <code>useRef</code>.</p>`,
      },
      {
        q: 'What are custom hooks for?',
        q_es: '¿Para qué sirven los hooks personalizados?',
        a: `<p><b>EN:</b> A custom hook is a JavaScript function whose name starts with "use". It lets you extract component logic into a reusable function. For example, if you have logic for fetching data in many components, you can create a <code>useFetch</code> hook. This helps to keep your components clean and to reuse logic easily.</p>`,
        a_es: `<p><b>ES:</b> Un hook personalizado es una función de JavaScript cuyo nombre empieza con "use" y que puede llamar a otros hooks. Sirven para extraer y reutilizar lógica con estado (stateful logic) entre diferentes componentes. Por ejemplo, podrías crear un hook <code>useFetch(url)</code> que maneje la lógica de una llamada a una API (estados de carga, error y datos). Esto ayuda a mantener los componentes más limpios, simples y a evitar la duplicación de código.</p>`,
      },
      {
        q: 'What is a Higher Order Component (HOC)?',
        q_es: '¿Qué es un Higher Order Component (HOC)?',
        a: `<p><b>EN:</b> A Higher-Order Component (HOC) is a function that takes a component and returns a new component with extra props or logic. It's an older pattern in React for reusing component logic. For example, a HOC could add user data as a prop to any component you give it. Custom hooks are now the more common way to do this.</p>`,
        a_es: `<p><b>ES:</b> Un Higher-Order Component (HOC) es un patrón avanzado en React. Es una función que recibe un componente como argumento y devuelve un nuevo componente mejorado. El HOC "envuelve" al componente original para añadirle props adicionales, lógica o comportamiento. Por ejemplo, un HOC <code>withAuth</code> podría verificar si el usuario está autenticado y, solo si lo está, renderizar el componente envuelto. Aunque potentes, los hooks personalizados son a menudo una alternativa más simple y moderna.</p>`,
      },
      {
        q: 'What is the difference between class components and functional components?',
        q_es: '¿Qué diferencia hay entre componentes de clase y componentes funcionales?',
        a: `<p><b>EN:</b> <b>Class components</b> use ES6 classes and have a <code>render</code> method. They use lifecycle methods like <code>componentDidMount</code> to handle side effects. <b>Functional components</b> are simpler JavaScript functions. Before hooks, they were just for showing UI (stateless). Now, with hooks like <code>useState</code> and <code>useEffect</code>, they can do everything class components can do. Today, functional components with hooks are the recommended way to write React components.</p>`,
        a_es: `<p><b>ES:</b> <b>Componentes de Clase:</b> Usan la sintaxis de clases de ES6, extienden de <code>React.Component</code> y usan un método <code>render()</code> para devolver JSX. El estado se maneja con <code>this.state</code> y el ciclo de vida con métodos como <code>componentDidMount</code> o <code>componentDidUpdate</code>. <b>Componentes Funcionales:</b> Son funciones de JavaScript que reciben props y devuelven JSX. Antes eran "sin estado", pero con la introducción de los hooks (<code>useState</code>, <code>useEffect</code>, etc.), ahora pueden manejar estado, ciclo de vida y otras características de React. Hoy en día, los componentes funcionales con hooks son el estándar recomendado por su simplicidad y legibilidad.</p>`,
      },
      {
        q: 'What is Server Side Rendering (SSR)? How is it used with React?',
        q_es: '¿Qué es el Server Side Rendering (SSR)? ¿Cómo se usa con React?',
        a: `<p><b>EN:</b> Server-Side Rendering (SSR) means that the server sends a fully rendered HTML page to the browser. The user sees the content immediately. After the page loads, React (JavaScript) takes over, and the page becomes interactive. This is good for SEO (search engines can read the content) and for a faster first-page load. Frameworks like Next.js make SSR easier with React.</p>`,
        a_es: `<p><b>ES:</b> Server-Side Rendering (SSR) es el proceso de renderizar una página de React en el servidor en lugar de en el navegador del cliente. Cuando un usuario solicita una página, el servidor genera el HTML completo y lo envía al navegador. El usuario ve el contenido inmediatamente. Luego, el JavaScript de React se carga en segundo plano y "hidrata" la página, haciéndola interactiva. Se usa para mejorar el rendimiento de la carga inicial (First Contentful Paint) y el SEO, ya que los motores de búsqueda pueden indexar el contenido HTML directamente. Se implementa con frameworks como Next.js o manualmente con un servidor Node.js.</p>`,
      },
      {
        q: 'How do you handle communication between components (parent-child, child-parent, sibling)?',
        q_es: '¿Cómo se maneja la comunicación entre componentes (parent-child, child-parent, sibling)?',
        a: `<p><b>EN:</b><ul><li><b>Parent to Child:</b> The parent passes data to the child using <b>props</b>.</li><li><b>Child to Parent:</b> The parent passes a <b>callback function</b> as a prop to the child. The child calls this function to send data back up to the parent.</li><li><b>Between Siblings (brothers):</b> You "lift state up". You move the shared state to their closest common parent. The parent then passes the state down to both siblings as props. For more complex cases, you can use <b>Context API</b> or a state management library like Redux or Zustand.</li></ul></p>`,
        a_es: `<p><b>ES:</b><ul><li><b>Padre a Hijo (Parent-to-Child):</b> Se usa <b>props</b>. El componente padre pasa datos al hijo a través de sus atributos.</li><li><b>Hijo a Padre (Child-to-Parent):</b> Se usan <b>funciones de callback</b>. El padre define una función y la pasa como prop al hijo. El hijo ejecuta esa función cuando necesita comunicar algo al padre, pasándole datos como argumentos.</li><li><b>Entre Hermanos (Sibling-to-Sibling):</b> Se usa el patrón <b>"levantar el estado" (lifting state up)</b>. El estado compartido se mueve al ancestro común más cercano. Este padre luego pasa el estado y las funciones para modificarlo a ambos hijos a través de props. Para casos más complejos, se puede usar la <b>Context API</b> o una librería de gestión de estado global (Redux, Zustand).</li></ul></p>`,
      },
    ],
  },
  {
    id: 'performance-optimization',
    category: 'Optimization & Performance',
    category_es: 'Optimización y Rendimiento',
    qa: [
      {
        q: 'What is useMemo and when would you use it?',
        q_es: '¿Qué es useMemo y cuándo lo usarías?',
        a: `<p><b>EN:</b> <code>useMemo</code> is a hook that saves the <b>result</b> of a slow calculation. It only runs the calculation again if one of its inputs (dependencies) changes. You use it when you have a calculation that takes a long time, so your component doesn't get slow on every re-render.</p>`,
        a_es: `<p><b>ES:</b> <code>useMemo</code> es un hook que memoriza (cachea) el <b>valor de retorno</b> de una función. Solo vuelve a ejecutar la función si una de sus dependencias ha cambiado. Lo usarías para evitar cálculos costosos en cada renderizado, como filtrar o transformar un array grande, que de otro modo ralentizarían el componente.</p>`,
      },
      {
        q: 'What is useCallback and when would you use it?',
        q_es: '¿Qué es useCallback y cuándo lo usarías?',
        a: `<p><b>EN:</b> <code>useCallback</code> is a hook that saves a <b>function itself</b>, not its result. It gives you back the exact same function on every re-render, unless its inputs (dependencies) change. You use it when you pass a function as a prop to a child component that is optimized with <code>React.memo</code>. This helps the child component to not re-render when it doesn't need to.</p>`,
        a_es: `<p><b>ES:</b> <code>useCallback</code> es un hook que memoriza la <b>instancia de una función</b>. Devuelve la misma referencia de la función entre renderizados, a menos que una de sus dependencias cambie. Lo usarías principalmente para pasar funciones como props a componentes hijos optimizados (con <code>React.memo</code>), evitando que se vuelvan a renderizar innecesariamente solo porque la función prop es una nueva instancia en cada render del padre.</p>`,
      },
      {
        q: 'What is the difference between useMemo and useCallback?',
        q_es: '¿Qué diferencia hay entre useMemo y useCallback?',
        a: `<p><b>EN:</b> The main difference is what they save. <code>useMemo</code> saves a <b>value</b> (like a number or an array). <code>useCallback</code> saves a <b>function</b>. Think of it like this: <code>useMemo</code> saves the finished cake, <code>useCallback</code> saves the recipe to make the cake. In fact, <code>useCallback(fn, deps)</code> is the same as <code>useMemo(() => fn, deps)</code>.</p>`,
        a_es: `<p><b>ES:</b> La principal diferencia es lo que memorizan. <code>useMemo</code> memoriza un <b>valor</b> (el resultado de ejecutar la función). <code>useCallback</code> memoriza la <b>función</b> en sí. En resumen: <code>useCallback(fn, deps)</code> es un atajo para <code>useMemo(() => fn, deps)</code>.</p>`,
      },
      {
        q: 'What is React.memo? When should you use it?',
        q_es: '¿Qué es React.memo? ¿Cuándo conviene usarlo?',
        a: `<p><b>EN:</b> <code>React.memo</code> is a tool that you can wrap around your component. It tells React: "Do not re-render this component if its props are the same as last time." You should use it on components that re-render often with the same props, or on components that are very slow to render. It helps to make your app faster.</p>`,
        a_es: `<p><b>ES:</b> <code>React.memo</code> es un Higher-Order Component (HOC) que envuelve un componente y evita que se vuelva a renderizar si sus <b>props no han cambiado</b> (hace una comparación superficial o "shallow comparison"). Es una optimización de rendimiento. Conviene usarlo en componentes que se renderizan a menudo con las mismas props, o que tienen un coste de renderizado alto. Funciona muy bien en combinación con <code>useCallback</code> para las props de tipo función.</p>`,
      },
      {
        q: 'Does React 18/19 still recommend using memoization hooks manually, or does it do it alone?',
        q_es: '¿React 18/19 sigue recomendando el uso de hooks de memorización manualmente o lo hace solo?',
        a: `<p><b>EN:</b> In React 18, you still need to use <code>useMemo</code> and <code>useCallback</code> yourself. But, the React team is building a new <b>React Compiler</b> (previously called "Forget"). In the future, this compiler will automatically add these optimizations for you. You will not need to write them by hand. This will probably be a big feature in React 19.</p>`,
        a_es: `<p><b>ES:</b> En React 18, todavía se recomienda usar <code>useMemo</code> y <code>useCallback</code> manualmente cuando sea necesario. Sin embargo, el equipo de React está trabajando en un <b>React Compiler</b> (antes llamado "Forget") que en el futuro hará estas optimizaciones de forma automática. Esto significa que el compilador analizará el código y aplicará la memorización sin que tengamos que escribir los hooks manualmente. Se espera que esto sea una característica clave a partir de React 19, simplificando mucho la optimización.</p>`,
      },
      {
        q: 'How can you avoid unnecessary re-renders in a React component?',
        q_es: '¿Cómo puedes evitar renderizados innecesarios en un componente React?',
        a: `<p><b>EN:</b> There are a few ways:
          <ul>
            <li><b><code>React.memo</code>:</b> Wrap your component with it to stop re-renders when props don't change.</li>
            <li><b><code>useMemo</code>:</b> Use it to save the result of slow calculations.</li>
            <li><b><code>useCallback</code>:</b> Use it to save functions that you pass as props.</li>
            <li><b>Lifting State Up:</b> Move state up to a parent component, so only the components that need the state will re-render.</li>
            <li><b>Component Composition:</b> Pass JSX as the <code>children</code> prop. This can sometimes prevent the children from re-rendering with the parent.</li>
          </ul>
        </p>`,
        a_es: `<p><b>ES:</b> Hay varias formas:
          <ul>
            <li><b><code>React.memo</code>:</b> Para componentes funcionales, evita el re-render si las props no cambian.</li>
            <li><b><code>useMemo</code>:</b> Para memorizar resultados de cálculos costosos y evitar que se recalculen en cada render.</li>
            <li><b><code>useCallback</code>:</b> Para memorizar funciones pasadas como props a componentes hijos optimizados.</li>
            <li><b>Levantar el estado (Lifting State Up):</b> Mover el estado al ancestro común más cercano para que solo los componentes que dependen de ese estado se re-rendericen.</li>
            <li><b>Composición de componentes:</b> Pasar componentes como <code>children</code> (prop) puede evitar que se re-rendericen cuando el padre lo hace, ya que la referencia a <code>children</code> no cambia.</li>
          </ul>
        </p>`,
      },
    ],
  },
  {
    id: 'state-management',
    category: 'State Management',
    category_es: 'Gestión de Estado',
    qa: [
      {
        q: 'When would you choose Context API over a library like Redux/Zustand?',
        q_es: '¿Cuándo elegirías la Context API en lugar de una librería como Redux/Zustand?',
        a: `
          <p><b>EN:</b></p>
          <ul>
            <li><b>Context API:</b> Ideal for low-frequency updates and for passing data deep down the component tree without "prop drilling". Good for things like theme (dark/light mode), user authentication status, or language preference. It's built-in, so no extra dependencies. However, it can cause performance issues if the value changes often, as all consuming components will re-render.</li>
            <li><b>Redux/Zustand:</b> Better for complex, high-frequency state changes that are central to the application's logic (e.g., a shopping cart, complex form state, application-wide data). They offer more powerful tools like middleware (Redux), devtools for debugging, and more optimized re-renders.</li>
          </ul>
        `,
        a_es: `
          <p><b>ES:</b></p>
          <ul>
            <li><b>Context API:</b> Ideal para actualizaciones de baja frecuencia y para pasar datos a niveles profundos del árbol de componentes sin "prop drilling". Bueno para cosas como el tema (modo oscuro/claro), estado de autenticación del usuario o preferencia de idioma. Es nativo, por lo que no requiere dependencias adicionales. Sin embargo, puede causar problemas de rendimiento si el valor cambia a menudo, ya que todos los componentes consumidores se re-renderizarán.</li>
            <li><b>Redux/Zustand:</b> Mejor para estados complejos y de alta frecuencia que son centrales para la lógica de la aplicación (ej. un carrito de compras, el estado de un formulario complejo, datos de toda la aplicación). Ofrecen herramientas más potentes como middleware (Redux), devtools para depuración y re-renders más optimizados.</li>
          </ul>
        `,
      },
    ],
  },
  {
    id: 'api-integration',
    category: 'API Integration & Headless CMS',
    category_es: 'Integración con APIs y Headless CMS',
    qa: [
      {
        q: "What's the difference between REST and GraphQL?",
        q_es: '¿Cuál es la diferencia entre REST y GraphQL?',
        a: `
          <p><b>EN:</b></p>
          <ul>
            <li><b>REST:</b> An architectural style. You interact with resources via predefined endpoints (e.g., <code>/users</code>, <code>/users/1</code>). It often leads to <b>over-fetching</b> (getting more data than you need) or <b>under-fetching</b> (having to make multiple requests to get all the data you need).</li>
            <li><b>GraphQL:</b> A query language for your API. The client specifies exactly what data it needs in a single request, and the server returns exactly that. This solves over/under-fetching. It uses a single endpoint and a strongly-typed schema.</li>
          </ul>
        `,
        a_es: `
          <p><b>ES:</b></p>
          <ul>
            <li><b>REST:</b> Un estilo de arquitectura. Interactúas con recursos a través de endpoints predefinidos (ej. <code>/users</code>, <code>/users/1</code>). A menudo conduce a <b>over-fetching</b> (obtener más datos de los que necesitas) o <b>under-fetching</b> (tener que hacer múltiples peticiones para obtener todos los datos que necesitas).</li>
            <li><b>GraphQL:</b> Un lenguaje de consulta para tu API. El cliente especifica exactamente qué datos necesita en una única petición, y el servidor devuelve exactamente eso. Esto resuelve el over/under-fetching. Utiliza un único endpoint y un esquema fuertemente tipado.</li>
          </ul>
        `,
      },
      {
        q: 'What is a Headless CMS and why is it useful?',
        q_es: '¿Qué es un Headless CMS y por qué es útil?',
        a: `
          <p><b>EN:</b> A Headless CMS is a back-end only content management system that acts as a content repository. "Headless" means it's decoupled from the presentation layer (the "head", i.e., the website front-end).</p>
          <p><b>Why is it useful?</b> It provides content via an API (like REST or GraphQL). This allows developers to use any front-end framework (like React) to build the user interface, and also to distribute the same content to multiple platforms (web, mobile app, IoT devices) from a single source.</p>
        `,
        a_es: `
          <p><b>ES:</b> Un Headless CMS es un sistema de gestión de contenidos que solo se encarga del back-end y actúa como un repositorio de contenido. "Headless" (sin cabeza) significa que está desacoplado de la capa de presentación (la "cabeza", es decir, el front-end del sitio web).</p>
          <p><b>¿Por qué es útil?</b> Provee el contenido a través de una API (como REST o GraphQL). Esto permite a los desarrolladores usar cualquier framework de front-end (como React) para construir la interfaz de usuario, y también distribuir el mismo contenido a múltiples plataformas (web, app móvil, dispositivos IoT) desde una única fuente.</p>
        `,
      },
    ],
  },
  {
    id: 'tooling',
    category: 'Advanced Tooling & Best Practices',
    category_es: 'Herramientas Avanzadas y Buenas Prácticas',
    qa: [
      {
        q: 'What is Storybook and what problems does it solve?',
        q_es: '¿Qué es Storybook y qué problemas resuelve?',
        a: `
          <p><b>EN:</b> Storybook is an open-source tool for building UI components and pages in isolation. It streamlines UI development, testing, and documentation.</p>
          <p><b>Problems it solves:</b></p>
          <ul>
            <li><b>Development in Isolation:</b> You can build and test a component without needing to run the entire application or mock complex server states.</li>
            <li><b>Documentation:</b> It automatically generates a living style guide, making it easy for designers and developers to see all available components and their variations (props).</li>
            <li><b>Testing:</b> It facilitates visual regression testing and accessibility testing on individual components.</li>
          </ul>
        `,
        a_es: `
          <p><b>ES:</b> Storybook es una herramienta de código abierto para construir componentes de UI y páginas de forma aislada. Agiliza el desarrollo, las pruebas y la documentación de la UI.</p>
          <p><b>Problemas que resuelve:</b></p>
          <ul>
            <li><b>Desarrollo Aislado:</b> Puedes construir y probar un componente sin necesidad de ejecutar toda la aplicación o simular estados complejos del servidor.</li>
            <li><b>Documentación:</b> Genera automáticamente una guía de estilo viva, facilitando que diseñadores y desarrolladores vean todos los componentes disponibles y sus variaciones (props).</li>
            <li><b>Pruebas:</b> Facilita las pruebas de regresión visual y las pruebas de accesibilidad en componentes individuales.</li>
          </ul>
        `,
      },
    ],
  },
  {
    id: 'integration-compatibility',
    category: 'Integration & Compatibility',
    category_es: 'Integración y Compatibilidad',
    qa: [
      {
        q: 'What are Custom Elements?',
        q_es: '¿Qué son los Custom Elements?',
        a: `<p><b>EN:</b> Custom Elements are a feature of Web Components. They let you create your own HTML tags with their own logic and styles. For example, you could create a <code>&lt;special-button&gt;</code> tag that works the same way everywhere in your app. They are a web standard, so they work in all modern browsers without needing a library like React.</p>`,
        a_es: `<p><b>ES:</b> Los Custom Elements son una característica de los Web Components. Te permiten crear tus propias etiquetas HTML con su propia lógica y estilos. Por ejemplo, podrías crear una etiqueta <code>&lt;special-button&gt;</code> que funcione de la misma manera en toda tu aplicación. Son un estándar web, por lo que funcionan en todos los navegadores modernos sin necesidad de una librería como React.</p>`,
      },
      {
        q: 'How do you integrate Custom Elements (Web Components) in React 19?',
        q_es: '¿Cómo se integran los Custom Elements (Web Components) en React 19?',
        a: `<p><b>EN:</b> Before React 19, using Custom Elements was a bit difficult because of how React handled properties. In React 19, it's much easier. React now fully supports Custom Elements. You can pass properties (props) to them directly, just like with regular React components. This makes it simple to use any Web Component in your React app.</p>`,
        a_es: `<p><b>ES:</b> Antes de React 19, usar Custom Elements era un poco difícil por cómo React manejaba las propiedades. En React 19, es mucho más fácil. React ahora soporta completamente los Custom Elements. Puedes pasarles propiedades (props) directamente, igual que a los componentes normales de React. Esto hace que sea muy sencillo usar cualquier Web Component en tu aplicación de React.</p>`,
      },
      {
        q: 'What are the benefits of using Shadow DOM in Custom Elements?',
        q_es: '¿Qué ventajas ofrece el uso de Shadow DOM en Custom Elements?',
        a: `<p><b>EN:</b> The Shadow DOM is like a private, hidden part of a Custom Element. It has two main benefits: <b>1. Scoped CSS:</b> The styles you write inside the Shadow DOM only affect that element. They don't leak out and mess up the rest of your page. <b>2. Encapsulation:</b> The element's internal structure is hidden from the main page. This makes your component more robust and reusable, because it won't be accidentally changed from the outside.</p>`,
        a_es: `<p><b>ES:</b> El Shadow DOM es como una parte privada y oculta de un Custom Element. Tiene dos ventajas principales: <b>1. CSS Aislado (Scoped CSS):</b> Los estilos que escribes dentro del Shadow DOM solo afectan a ese elemento. No se "filtran" y estropean el resto de tu página. <b>2. Encapsulación:</b> La estructura interna del elemento está oculta de la página principal. Esto hace que tu componente sea más robusto y reutilizable, porque no se podrá cambiar accidentalmente desde fuera.</p>`,
      },
    ],
  },
  {
    id: 'practice-testing',
    category: 'Practice & Technical Tests',
    category_es: 'Práctica y Pruebas Técnicas',
    qa: [
      {
        q: 'How do you create and use a controlled form in React?',
        q_es: '¿Cómo creas y usas un formulario controlado en React?',
        a: `<p><b>EN:</b> A controlled form is a form where React controls the value of the input fields. You do this in three steps:</p>
            <ol>
              <li>Create a state variable with <code>useState</code> to hold the value of the input (e.g., <code>const [name, setName] = useState('');</code>).</li>
              <li>Set the <code>value</code> of the input element to your state variable (e.g., <code>&lt;input value={name} /&gt;</code>).</li>
              <li>Use the <code>onChange</code> event to call your state's <code>set</code> function whenever the user types (e.g., <code>onChange={(e) => setName(e.target.value)}</code>).</li>
            </ol>
            <p>This way, React's state is always the "single source of truth" for the form's data.</p>`,
        a_es: `<p><b>ES:</b> Un formulario controlado es aquel donde React controla el valor de los campos de entrada. Lo haces en tres pasos:</p>
            <ol>
              <li>Creas una variable de estado con <code>useState</code> para guardar el valor del input (ej. <code>const [name, setName] = useState('');</code>).</li>
              <li>Asignas el <code>value</code> del elemento input a tu variable de estado (ej. <code>&lt;input value={name} /&gt;</code>).</li>
              <li>Usas el evento <code>onChange</code> para llamar a la función <code>set</code> de tu estado cada vez que el usuario escribe (ej. <code>onChange={(e) => setName(e.target.value)}</code>).</li>
            </ol>
            <p>De esta forma, el estado de React es siempre la "única fuente de la verdad" para los datos del formulario.</p>`,
      },
      {
        q: 'How would you fetch data from a REST API in React and display it?',
        q_es: '¿Cómo consumirías una API REST en React y mostrarías los datos?',
        a: `<p><b>EN:</b> The best way is to use the <code>useEffect</code> hook to make the API call when the component first loads. Inside <code>useEffect</code>, you can use the <code>fetch</code> function or a library like <code>axios</code>. You also need a state with <code>useState</code> to store the data, and another state for the loading status.</p>
            <pre><code>const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(apiData => {
      setData(apiData);
      setLoading(false);
    });
}, []); // The empty array [] means this runs only once.</code></pre>
            <p>Then, in your JSX, you can show a "Loading..." message if <code>loading</code> is true, or map over the <code>data</code> to display it.</p>`,
        a_es: `<p><b>ES:</b> La mejor forma es usar el hook <code>useEffect</code> para hacer la llamada a la API cuando el componente se carga por primera vez. Dentro de <code>useEffect</code>, puedes usar la función <code>fetch</code> o una librería como <code>axios</code>. También necesitas un estado con <code>useState</code> para guardar los datos y otro para el estado de carga.</p>
            <pre><code>const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(apiData => {
      setData(apiData);
      setLoading(false);
    });
}, []); // El array vacío [] significa que se ejecuta solo una vez.</code></pre>
            <p>Luego, en tu JSX, puedes mostrar un mensaje "Cargando..." si <code>loading</code> es <code>true</code>, o mapear sobre los <code>data</code> para mostrarlos.</p>`,
      },
      {
        q: 'How would you handle errors in a React application?',
        q_es: '¿Cómo manejarías errores en una aplicación React?',
        a: `<p><b>EN:</b> There are two main types of errors:</p>
            <ul>
              <li><b>API Errors:</b> When fetching data, use a <code>.catch()</code> block on your promise or a <code>try...catch</code> block with <code>async/await</code>. Store the error in a state variable and show an error message to the user.</li>
              <li><b>Rendering Errors:</b> These are errors in your component's code. To prevent the whole app from crashing, you can use <b>Error Boundaries</b>. An Error Boundary is a special component that you wrap around other components. If a component inside it crashes, the Error Boundary will catch the error and show a fallback UI (like an error message) instead of a blank page.</li>
            </ul>`,
        a_es: `<p><b>ES:</b> Hay dos tipos principales de errores:</p>
            <ul>
              <li><b>Errores de API:</b> Al obtener datos, usa un bloque <code>.catch()</code> en tu promesa o un bloque <code>try...catch</code> con <code>async/await</code>. Guarda el error en una variable de estado y muestra un mensaje de error al usuario.</li>
              <li><b>Errores de Renderizado:</b> Son errores en el código de tu componente. Para evitar que toda la aplicación se rompa, puedes usar <b>Error Boundaries</b>. Un Error Boundary es un componente especial que envuelve a otros componentes. Si un componente dentro de él falla, el Error Boundary captura el error y muestra una UI alternativa (como un mensaje de error) en lugar de una página en blanco.</li>
            </ul>`,
      },
      {
        q: 'How would you test a React component? What tools would you use?',
        q_es: '¿Cómo testearías un componente de React? ¿Qué herramientas usarías?',
        a: `<p><b>EN:</b> To test a React component, you simulate user actions and check if the component behaves as expected. The most common tools are:</p>
            <ul>
              <li><b>Jest:</b> A test runner that finds and runs your tests.</li>
              <li><b>React Testing Library (RTL):</b> A library that helps you render components in a test environment and interact with them like a real user would (e.g., clicking buttons, filling forms). It encourages you to test what the user sees, not the internal code.</li>
            </ul>
            <p>A simple test would be: render the component, find an element on the screen, simulate a click, and then check if the text on the screen changed correctly.</p>`,
        a_es: `<p><b>ES:</b> Para testear un componente de React, simulas acciones de usuario y compruebas si el componente se comporta como se espera. Las herramientas más comunes son:</p>
            <ul>
              <li><b>Jest:</b> Un "test runner" que encuentra y ejecuta tus tests.</li>
              <li><b>React Testing Library (RTL):</b> Una librería que te ayuda a renderizar componentes en un entorno de prueba e interactuar con ellos como lo haría un usuario real (ej. hacer clic en botones, rellenar formularios). Te anima a testear lo que el usuario ve, no el código interno.</li>
            </ul>
            <p>Un test simple sería: renderizar el componente, buscar un elemento en la pantalla, simular un clic y luego comprobar si el texto en la pantalla cambió correctamente.</p>`,
      },
      {
        q: 'How would you pass a function as a prop to a child component and avoid unnecessary re-renders?',
        q_es: '¿Cómo pasarías una función como prop a un componente hijo y evitarías renders innecesarios?',
        a: `<p><b>EN:</b> You use two hooks together:</p>
            <ol>
              <li><b><code>useCallback</code> in the Parent:</b> Wrap the function you are passing down in the <code>useCallback</code> hook. This ensures that React gives you the exact same function instance on every re-render, unless its dependencies change.</li>
              <li><b><code>React.memo</code> on the Child:</b> Wrap the child component with <code>React.memo</code>. This tells the child component to only re-render if its props have actually changed.</li>
            </ol>
            <p>Without <code>useCallback</code>, the parent would create a new function on every render, and <code>React.memo</code> would think the prop has changed, causing an unnecessary re-render of the child.</p>`,
        a_es: `<p><b>ES:</b> Usas dos hooks juntos:</p>
            <ol>
              <li><b><code>useCallback</code> en el Padre:</b> Envuelve la función que vas a pasar como prop en el hook <code>useCallback</code>. Esto asegura que React te dé exactamente la misma instancia de la función en cada render, a menos que sus dependencias cambien.</li>
              <li><b><code>React.memo</code> en el Hijo:</b> Envuelve el componente hijo con <code>React.memo</code>. Esto le dice al componente hijo que solo se vuelva a renderizar si sus props han cambiado realmente.</li>
            </ol>
            <p>Sin <code>useCallback</code>, el padre crearía una nueva función en cada render, y <code>React.memo</code> pensaría que la prop ha cambiado, causando un re-render innecesario del hijo.</p>`,
      },
    ],
  },
  {
    id: 'advanced-topics',
    category: 'Advanced Topics',
    category_es: 'Avanzado',
    qa: [
      {
        q: 'What do you know about the React Compiler and the new automatic optimizations?',
        q_es: '¿Qué sabes sobre el React Compiler y las nuevas optimizaciones automáticas?',
        a: `<p><b>EN:</b> The React Compiler (previously "Forget") is a new tool the React team is building. Its job is to automatically optimize React code, so we don't have to use hooks like <code>useMemo</code> and <code>useCallback</code> manually. It analyzes the code and decides which parts should be "memoized" to prevent unnecessary re-renders. This will make development simpler, reduce bugs, and improve app performance without the developer having to always think about manual optimization. It is expected to be a major part of future React versions (like React 19).</p>`,
        a_es: `<p><b>ES:</b> El React Compiler (antes conocido como "Forget") es un compilador que el equipo de React está desarrollando. Su objetivo es optimizar automáticamente el código de React, eliminando la necesidad de usar hooks como <code>useMemo</code> y <code>useCallback</code> de forma manual. Analiza el código y decide qué partes deben "memorizarse" para evitar re-renders innecesarios. Esto simplificará el desarrollo, reducirá errores y mejorará el rendimiento de las aplicaciones sin que el desarrollador tenga que pensar constantemente en la optimización manual. Se espera que sea una parte importante de futuras versiones de React (como React 19).</p>`,
      },
      {
        q: 'What do you know about Suspense and Concurrent Rendering in React?',
        q_es: '¿Qué sabes sobre Suspense y Concurrent Rendering en React?',
        a: `<p><b>EN:</b> <b>Concurrent Rendering</b> is a new ability in React that lets it prepare multiple UI updates at the same time without blocking the interface. It's like React can pause a big render to do a more urgent one (like responding to a click) and then continue the first one later. <b>Suspense</b> is a feature that works with Concurrent Rendering. It lets components "wait" for something to happen (like data loading) before they render, showing a loading UI (fallback) in the meantime. Together, they greatly improve the user experience.</p>`,
        a_es: `<p><b>ES:</b> <b>Concurrent Rendering</b> es una nueva capacidad de React que le permite preparar múltiples actualizaciones de la UI al mismo tiempo sin bloquear la interfaz. Es como si React pudiera pausar un renderizado grande para hacer uno más urgente (como responder a un clic) y luego continuar con el anterior. <b>Suspense</b> es una característica que funciona con Concurrent Rendering. Permite a los componentes "esperar" a que algo suceda (como la carga de datos) antes de renderizarse, mostrando mientras tanto una UI de carga (fallback). Juntos, mejoran mucho la experiencia de usuario.</p>`,
      },
      {
        q: 'How would you handle global state in a React application (Redux, Context, Zustand, etc.)?',
        q_es: '¿Cómo manejarías el estado global en una aplicación React (Redux, Context, Zustand, etc.)?',
        a: `<p><b>EN:</b> The choice depends on the application's complexity:</p>
            <ul>
              <li><b>Context API:</b> This is React's built-in solution. I would use it for data that doesn't change very often, like the app's theme or the user's information. It's simple, but can cause unnecessary re-renders if the state changes frequently.</li>
              <li><b>Zustand:</b> For small to medium applications, or when I need a simpler global state solution, Zustand is an excellent choice. It's very lightweight and easy to set up (like <code>useState</code>), but powerful and optimized. It avoids the re-render problem of Context and doesn't require wrapping the whole app in a <code>Provider</code>.</li>
              <li><b>Redux (with Redux Toolkit):</b> This is my go-to choice for large-scale applications. Redux Toolkit simplifies the classic Redux setup, removing a lot of boilerplate code. I choose it because it enforces a predictable and centralized state management, which is crucial for complex apps with many interacting parts. Its key features like the centralized store, immutable updates via "slices", and powerful DevTools for time-travel debugging make it incredibly robust for maintaining and scaling large codebases.</li>
            </ul>`,
        a_es: `<p><b>ES:</b> La elección depende de la complejidad de la aplicación:</p>
            <ul>
              <li><b>Context API:</b> Es la solución integrada de React. La usaría para datos que no cambian muy a menudo, como el tema de la aplicación o la información del usuario. Es simple, pero puede causar re-renders innecesarios si el estado cambia con frecuencia.</li>
              <li><b>Zustand:</b> Para aplicaciones pequeñas o medianas, o cuando necesito una solución de estado global más simple, Zustand es una excelente opción. Es muy ligero y fácil de configurar (parecido a <code>useState</code>), pero potente y optimizado. Evita el problema de los re-renders de Context y no requiere envolver toda la app en un <code>Provider</code>.</li>
              <li><b>Redux (con Redux Toolkit):</b> Esta es mi elección principal para aplicaciones a gran escala. Redux Toolkit simplifica la configuración clásica de Redux, eliminando mucho código repetitivo (boilerplate). Lo elijo porque impone una gestión de estado predecible y centralizada, lo cual es crucial para aplicaciones complejas con muchas partes que interactúan entre sí. Sus características clave como el "store" centralizado, las actualizaciones inmutables a través de "slices" y las potentes DevTools para depuración (time-travel debugging) lo hacen increíblemente robusto para mantener y escalar bases de código grandes.</li>
            </ul>`,
      },
      {
        q: 'How would you implement internationalization (i18n) in React?',
        q_es: '¿Cómo implementarías internacionalización (i18n) en React?',
        a: `<p><b>EN:</b> I would use a specialized library like <code>react-i18next</code>, which is the industry standard. The general steps are:</p>
            <ol>
              <li><b>Setup:</b> Install the library and configure it with the supported languages (e.g., 'en', 'es').</li>
              <li><b>Translation Files:</b> Create JSON files for each language with key-value pairs (e.g., <code>"welcome": "Welcome"</code>).</li>
              <li><b>Provider:</b> Wrap the application in an <code>I18nextProvider</code>.</li>
              <li><b>Usage:</b> In components, use the <code>useTranslation</code> hook to get the <code>t</code> function. Then, use <code>t('welcome')</code> instead of hardcoded text.</li>
            </ol>`,
        a_es: `<p><b>ES:</b> Usaría una librería especializada como <code>react-i18next</code>, que es el estándar de la industria. Los pasos generales son:</p>
            <ol>
              <li><b>Configuración:</b> Instalar la librería y configurarla con los idiomas soportados (ej. 'en', 'es').</li>
              <li><b>Archivos de Traducción:</b> Crear archivos JSON para cada idioma con pares de clave-valor (ej. <code>"welcome": "Bienvenido"</code>).</li>
              <li><b>Provider:</b> Envolver la aplicación en un <code>I18nextProvider</code>.</li>
              <li><b>Uso:</b> En los componentes, usar el hook <code>useTranslation</code> para obtener la función <code>t</code>. Luego, usar <code>t('welcome')</code> en lugar de texto fijo.</li>
            </ol>`,
      },
    ],
  },
];

export default function Home() {
  return (
    <section>
      <Typography variant="h4" component="h2" gutterBottom>
        Interview Prep Guide
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Guía de Preparación para Entrevista
      </Typography>

      <Box component="nav" mb={4}>
        <Typography variant="h6" component="h4">
          Index / Índice
        </Typography>
        <List>
          {questions.map((section) => (
            <ListItem key={section.id} disablePadding>
              <Link href={`#${section.id}`}>
                {section.category} / {section.category_es}
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>

      {questions.map((section) => (
        <Box key={section.id} id={section.id} mb={4}>
          <Typography variant="h5" component="h3" gutterBottom>
            {section.category} / {section.category_es}
          </Typography>
          {section.qa.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography>
                  <b>EN:</b> {item.q}
                  <br />
                  <b>ES:</b> {item.q_es}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box dangerouslySetInnerHTML={{ __html: item.a_es }} />
                <hr style={{ margin: '16px 0' }} />
                <Box dangerouslySetInnerHTML={{ __html: item.a }} />
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
    </section>
  );
}