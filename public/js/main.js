// FRONT-END (CLIENT) JAVASCRIPT HERE

window.onload = function() {

  document.getElementById("create").onclick = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    
    const name = document.querySelector( '#name').value
    const attack = document.querySelector( '#attack').value
    const defense = document.querySelector( '#defense').value
    const speed = document.querySelector( '#speed').value
          json = { name: name, attack: attack, defense: defense, speed: speed, action: 'create' },
          body = JSON.stringify( json )
          console.log( json )
    const response = await fetch( '/submit', {
      method:'POST',
      body 
    })

    const text = await response.json()
    document.getElementById("Homework2").reset()
    createTableFromJSON(text)
  }

  document.getElementById("delete").onclick = async function( event ) {
    // stop form submission from trying to load
    // a new .html page for displaying results...
    // this was the original browser behavior and still
    // remains to this day
    event.preventDefault()
    
    const radio_elements = document.getElementsByName('type_radio')
    var index = radio_elements.length

    for (let i=0; i < radio_elements.length; i++) {
      if (radio_elements[i].checked) {
        index = i
        break
      }
    }
    json = { index: index, action: 'delete' },
    body = JSON.stringify( json )
    console.log( json )
    const response = await fetch( '/submit', {
      method:'POST',
      body 
    })

    const text = await response.json()
    console.log( 'text:', text )
    createTableFromJSON(text)
  }
  function createTableFromJSON(json) {
    let placeholder = document.querySelector("#data-output");
      let out = "";
      console.log(json.length)
      for(let i = 0; i < json.length; i++) {
        let product = json[i]
        out += `
            <tr>
                <td><input value=i name="type_radio" type="radio"> </td>
                <td>${product.name}</td>
                <td>${product.attack}</td>
                <td>${product.defense}</td>
                <td>${product.speed}</td>
                <td>${product.average}</td>
                <td>${product.recommended}</td>
            </tr>
          `;
      }
      placeholder.innerHTML = out;
      console.log(out)
  }
}