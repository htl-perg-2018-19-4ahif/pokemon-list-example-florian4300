interface IPokemonListResponse {
  results: IPokemonListItemResponse[];
}

interface IPokemonListItemResponse {
  name: string;
}

interface IPokemonDetailsResponse {
  weight: number;
  abilities: { ability: { name: string } }[],
  sprites: { front_default: string }
}

// tip RS: Consider lambda syntax
$(document).ready(() => {
    (async function () {
        // tip RS: Avoid any and use interface instead
        const pokelist: IPokemonListResponse = await $.get("https://pokeapi.co/api/v2/pokemon/");
        let html = "";
        // tip RS: Avoid template string if string is constant and single line
        html += '<table class="table">';
        html += `<thead>`;
        html += `<tr>`;
        html += `<th>Name</th>`;
        html += `<th>Details</th>`;
        html += `</tr>`;
        html += `</thead>`;
        
        html += `<tbody>`;
        for (const pokemon of pokelist.results) {
            html += `<tr>`;
            html += `<td>${pokemon.name}</td>`;
            html += `<td><button type="button" class="btn btn-info btn-lg" onclick=getData(this)>Details</button></td>`;
            html += `<td>`;
        }
        html += `</td>`;
        html += `</tr>`;
        html += `</tbody>`;
        html += `</table>`;
        html += `<div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">
          
            
            <div class="modal-header" text-center>
              <h4 class="modal-title" text-center>Details of</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            
            
            <div class="modal-body">
              <table class="table" id="details">
              <thead></thead>
              </table>
            </div>
            
            
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Back to the List</button>
            </div>
            
          </div>
        </div>
      </div>`;

        html += `</div>`;
        $("#pokemons")[0].innerHTML = html;
    })();
});

// tip RS: Just a normal function
function getData(element: HTMLElement) {
    const name = $(element)
        .parent()
        .siblings()[0].innerText;
    // tip RS: Avoid any again
    $.get(
        "https://pokeapi.co/api/v2/pokemon/" + name + "/",
        function (data : IPokemonDetailsResponse) {
            const weight: Number = data.weight;
            const abilities = data.abilities;
            $("table#details").children()[0].innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Weight</th>
          <th>Abilities</th>
        </tr>
      </thead><tbody>
      <tr>
      <td>${name}</td>
      <td><a href="${data.sprites.front_default}"><img src="${data.sprites.front_default}"></a></td> 
      <td>${weight}</td>
      <td rowspan=${abilities.length}>${abilities.map((ability) => ability.ability.name).join("<br/>")}
      
      </td>

       </tr></tbody>`;
            ($("#myModal") as any).modal("show");
        }
    );
};
