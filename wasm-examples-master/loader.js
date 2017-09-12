function loadWebAssembly(filename, importObject) {
  return fetch(filename)
    .then(response => response.arrayBuffer())
    .then(bytes =>WebAssembly.instantiate(bytes, importObject))
    .then(results =>
    results.instance);
}

function loadJS (url, imports = {}) {
  return fetch(url)
    .then(response => response.text())
    .then(code => new Function('imports', `return (${code})()`))
    .then(factory => ({ exports: factory(imports) }))
}
