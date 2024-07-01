const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
let ready=false;
let imagesLoad=0;
let totaImages=0;
let photoArray=[];



const count=30;
const apiKey="Gw4XgtOMV3WQg8MxtWvDkWAJGU9qKMFlJp0KVpG9q48";
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    imageLoad++;
    if(imageLoad===totaImages){
        ready=true;
        console.log('ready=',ready);
    }
    
}


// create elements for links & photos
function displayPhotos(){
    totaImages=photoArray.length;
    console.log('total Images:',totaImages);
    photoArray.forEach((photo)=>{
        // create <a> to link to unsplash
        const item=document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');

        // create <img> for photo
        const img=document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt',photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        // event listner ,check when each is finished loading
        img.addEventListener('load',imageLoaded);
        // put <img> inside <a> , then put both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);

    })
}

async function getPhotos(){
    try{
        const response=await fetch(apiUrl);
        photoArray= await response.json();
        
        displayPhotos();


    }catch(error){
        // catch error
    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready){
        getPhotos();
        ready=false;
        console.log('Load more');
        
    }
})

