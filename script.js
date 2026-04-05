


const FilterContainer = document.querySelector(".filters")
const imgInput = document.querySelector("#image-input")
const imageCanvas = document.querySelector("#image-canvas")
const canvasctx = imageCanvas.getContext("2d")
const resbtn = document.querySelector("#reset-btn")
let file = null;
let image1 = null;
let image = null;
let ogw, ogh;
let aspratio;
let w, h;

const relp = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}
// const relpcrop = {
//     crop: {
//         value: ogw,
//         max: Math.min(ogw, ogh * aspratio),
//         min: 20,
//         unit: "px",

//     }
// };


const filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },


}
const filterMap = {
    hueRotation: "hue-rotate",
    saturation: "saturate"
};
const filtercrop = {
    crop: {
        value: ogw,
        max: Math.min(ogw, ogh * aspratio),
        min: 20,
        unit: "px",

    }
};

function createFilterFunction(name, unit = "%", value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")
    const input = document.createElement("input");
    input.type = "range";
    input.max = max;
    input.min = min;
    input.id = name;
    input.value = value;

    const p = document.createElement("p");

    p.innerText = name;
    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {


        filters[name].value = input.value;


        applyFilters();



    })




    return div;

}
function createCrop(name, unit = "%", value, min, max) {
    const div = document.createElement("div")
    div.classList.add("filter")
    const input = document.createElement("input");
    input.type = "range";

    input.id = name;
    input.max = max;
    input.min = min;
    input.value = value;
    const p = document.createElement("p");
    p.innerText = name;
    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (event) => {

        filtercrop[name].value = input.value;
        applyFilters();





    })


    return div;
}

Object.keys(filters).forEach(key => {

    const filterElement = createFilterFunction(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max);
    FilterContainer.appendChild(filterElement);
})




imgInput.addEventListener("change", (event) => {
    file = event.target.files[0]
    const imgPlaceholder = document.querySelector(".placeholder")
    imgPlaceholder.style.display = "none"
    imageCanvas.style.display = "block"
    const img = new Image()
    img.src = URL.createObjectURL(file)
    image1 = img;


    img.onload = () => {
        image = img;
        imageCanvas.width = img.width;
        imageCanvas.height = img.height;
        canvasctx.drawImage(img, 0, 0)
        ogw = img.naturalWidth;
        ogh = img.naturalHeight;
        aspratio = ogw / ogh;
        filtercrop.crop.value = ogw;
        filtercrop.crop.max = Math.min(ogw, ogh * aspratio);
        Object.keys(filtercrop).forEach(key => {

            const cropElement = createCrop(key, filtercrop[key].unit, filtercrop[key].value, filtercrop[key].min, filtercrop[key].max);
            FilterContainer.appendChild(cropElement);
        })

    }
})

function applyFilters() {
    canvasctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    let filterString = "";

    Object.keys(filters).forEach(key => {

        let cssName = filterMap[key] || key
        filterString += `${cssName}(${filters[key].value}${filters[key].unit}) `;





    });





    canvasctx.filter = filterString.trim();


    const w = filtercrop.crop.value
    const h = w / aspratio

    const sx = (ogw - w) / 2;
    const sy = (ogh - h) / 2;


    canvasctx.drawImage(image, sx, sy, w, h, 0, 0, w, h)









}

function resetFun() {
    resbtn.addEventListener("click", () => {
        Object.keys(filters).forEach(key => {
            filters[key].value = relp[key].value;
            const filterid = document.getElementById(key)
            filterid.value = filters[key].value;
            applyFilters();
        })


        filtercrop.crop.value = ogw;
        const filteridcrop = document.getElementById("crop")
        filteridcrop.value = filtercrop.crop.value;
        applyFilters();


    })

}
resetFun()








