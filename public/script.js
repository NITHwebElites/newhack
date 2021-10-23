

// function hideList(input) {
    
// 	var datalist = document.querySelector("datalist");
// 	if (!input.value) {
// 		datalist.id = "";    		
// 	} else {
// 		datalist.id = "medicines";
// 	}
// }
// hideList(document.querySelector("input"));

var search = document.querySelector('#search');
        var results = document.querySelector('#medicines');
        var templateContent = document.querySelector('#resultstemplate').content;
        var mainHead = document.querySelector("#main-head");
        var mainForm = document.querySelector("#main-form");
        var datalist = document.querySelector("#resultsdatalist");
        mainForm.addEventListener('click', function handle(){
            mainHead.classList.add("main-head-display");
            mainForm.classList.add("form");
        });
        search.addEventListener('keyup', function handler(event) {
            while (results.children.length) results.removeChild(results.firstChild);
            var inputVal = new RegExp(search.value.trim(), 'i');
            var set = Array.prototype.reduce.call(templateContent.cloneNode(true).children,
                function searchFilter(frag, item, i) {
                    if (inputVal.test(item.textContent) && frag.children.length < 3) frag.appendChild(item);
                    return frag;
                }, document.createDocumentFragment());
            results.appendChild(set);
        });