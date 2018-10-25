if (process.env.NODE_ENV === 'production') {
  document.write(`
    <script src='//fe-public.licaigc.com/libs/core-js/core.min.js'><\/script>
    <script src='//fe-public.licaigc.com/libs/react/16.4.0/react.production.min.js'><\/script>
    <script src='//fe-public.licaigc.com/libs/react-dom/16.4.0/react-dom.production.min.js'><\/script>
  `)
} else {
  document.write(`
    <script src='//fe-public.licaigc.com/libs/core-js/core.min.js'><\/script>
    <script src='//fe-public.licaigc.com/libs/react/16.4.0/react.development.js'><\/script>
    <script src='//fe-public.licaigc.com/libs/react-dom/16.4.0/react-dom.development.js'><\/script>
  `)
}
