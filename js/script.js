let interviewList = [];
let rejectedList = [];
currentPosition = 'all';

let all = document.getElementById('all-list');
let allCount = document.getElementById('all-count');
let interview = document.getElementById('interview');
let rejected = document.getElementById('rejected');
let availableCount = document.getElementById('available-count');

let currentCount = document.getElementById('current-count');

const allButtons = document.getElementById('all-button-id');
const interviewButtons = document.getElementById('interview-button-id');
const rejectedButtons = document.getElementById('rejected-button-id');

const mainContainer = document.querySelector('main');
const filteredSection = document.getElementById('filtered-section');
const ofClass = document.getElementById('of-class');



function calculateCount(){
    interview.innerText = interviewList.length;
    rejected.innerText = rejectedList.length;
    // if(currentPosition === 'all'){
    
    allCount.innerText = all.children.length;
    availableCount.innerText = all.children.length;
    if(currentPosition === 'interview-button-id'){
        currentCount.innerText =interviewList.length;
    }else if(currentPosition === 'rejected-button-id'){
        currentCount.innerText =rejectedList.length;
    }
}

calculateCount();


// toggle buttons

function toggleStyle(id){
    allButtons.classList.remove('bg-[#3b82f6FF]','text-white');
    interviewButtons.classList.remove('bg-[#3b82f6FF]','text-white');
    rejectedButtons.classList.remove('bg-[#3b82f6FF]','text-white');

    allButtons.classList.add('bg-white');
    interviewButtons.classList.add('bg-white');
    rejectedButtons.classList.add('bg-white');

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white');
    selected.classList.add('bg-[#3b82f6FF]','text-white');
    currentPosition = id;

    if(id === 'interview-button-id'){
        ofClass.classList.remove('hidden');
        currentCount.classList.remove('hidden');
        availableCount.innerText = all.children.length;
        currentCount.innerText =interviewList.length;
        filteredSection.classList.remove('hidden');
        all.classList.add('hidden');
        renderInterviewList();
    }
    else if(id === 'rejected-button-id'){
        ofClass.classList.remove('hidden');
        currentCount.classList.remove('hidden');
        availableCount.innerText = all.children.length;
        currentCount.innerText =rejectedList.length;
        filteredSection.classList.remove('hidden');
        all.classList.add('hidden');
        renderRejectedList();
    }
    else{
        ofClass.classList.add('hidden');
        currentCount.classList.add('hidden');
        availableCount.innerText = all.children.length;
        filteredSection.classList.add('hidden');
        all.classList.remove('hidden');
    }

}

mainContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('interview-btn')){
        const parent = event.target.parentNode.parentNode;

        const companyName = parent.querySelector('.company-name').innerText;
        const positionName = parent.querySelector('.position-name').innerText;
        const jobType = parent.querySelector('.job-type').innerText;
        const jobDescription = parent.querySelector('.job-description').innerText;
        // const status = parent.querySelector('.current-status');
        // if(status){
        //     let currentStatus = status.innerText;
        // }
        // // console.log(currentStatus);
        // currentStatus.classList.remove('bg-[#eef4ffFF]','max-w-[113px]');
        // currentStatus.innerHTML = `<p class="rounded-sm py-1 px-3 border border-[#10b981FF] text-[#10b981FF] mr-2 max-w-[113px]">INTERVIEWD</p>`;
        // currentStatus.innerText= 'INTERVIEWD',
        // console.log(currentStatus);
        cardInfo = {
            companyName,
            positionName,
            jobType,
            currentStatus: 'INTERVIEWD',
            jobDescription
        }

        const cardExist = interviewList.find(job => job.companyName === companyName && job.positionName === positionName);
        const rejectedCardExist = rejectedList.find(job => job.companyName === companyName && job.positionName === positionName);
        if(!cardExist){
            interviewList.push(cardInfo);
            if(rejectedCardExist){
                const index = rejectedList.findIndex(job => job.companyName === companyName && job.positionName === positionName);
                rejectedList.splice(index, 1);
            }
        }
        // filtering out the card from rejected list if exist
        rejectedList = rejectedList.filter(job => (job.companyName !== cardInfo.companyName));
        if(currentPosition == 'rejected-button-id'){
               renderRejectedList();
        }
        
        // Updating original ALL section card
        const allCards = all.querySelectorAll('.bg-white');

        allCards.forEach(card => {
            const companyElement = card.querySelector('.company-name');

            if (companyElement) {
                company = companyElement.innerText;
            }
            const companyPosition = card.querySelector('.position-name');
            if (companyPosition) {
                position = companyPosition.innerText;
            }

            if(company === companyName && position === positionName){
                const status = card.querySelector('.current-status');
                status.classList.remove('bg-[#eef4ffFF]','max-w-[113px]');
                status.innerHTML = `
                    <p class="rounded-sm py-1 px-3 border border-[#10b981FF] text-[#10b981FF] mr-2 max-w-[113px]">
                        INTERVIEWD
                    </p>
                `;
            }
});
        calculateCount();
    }

    else if(event.target.classList.contains('rejected-btn')){
        const parent = event.target.parentNode.parentNode;
        const companyName = parent.querySelector('.company-name').innerText;
        const positionName = parent.querySelector('.position-name').innerText;
        const jobType = parent.querySelector('.job-type').innerText;
        const jobDescription = parent.querySelector('.job-description').innerText;
        const currentStatus = parent.querySelector('.current-status');
        // console.log(currentStatus);
        currentStatus.classList.remove('bg-[#eef4ffFF]','max-w-[113px]');
        currentStatus.innerHTML = `<p class="rounded-sm py-1 px-3 border border-[#ef4444FF] text-[#ef4444FF] mr-2 max-w-[113px]">REJECTED</p>`;

        const cardInfo = {
            companyName,
            positionName,
            jobType,
            currentStatus: 'REJECTED',
            jobDescription
        }

        const cardExist = rejectedList.find(job => job.companyName === companyName && job.positionName === positionName);
        const interviewCardExist = interviewList.find(job => job.companyName === companyName && job.positionName === positionName);
        if(!cardExist ){
            rejectedList.push(cardInfo);
            if(interviewCardExist){
                const index = interviewList.findIndex(job => job.companyName === companyName && job.positionName === positionName);
                interviewList.splice(index, 1);
            }
        }
        interviewList = interviewList.filter(job => (job.companyName !== cardInfo.companyName));
        if(currentPosition == 'interview-button-id'){
            renderInterviewList();
        }
        // Update original ALL section card
        const allCards = all.querySelectorAll('.bg-white');

        allCards.forEach(card => {
            // const company = card.querySelector('.company-name')?.innerText;
            // shortcut this is called optional chaining, it checks if the element exists before trying to access its innerText
            const companyElement = card.querySelector('.company-name');

            if (companyElement) {
                company = companyElement.innerText;
            }
            const companyPosition = card.querySelector('.position-name');
            if (companyPosition) {
                position = companyPosition.innerText;
            }

            if(company === companyName && position === positionName){
                const status = card.querySelector('.current-status');
                status.innerHTML = `
                    <p class="rounded-sm py-1 px-3 border border-[#ef4444FF] text-[#ef4444FF] mr-2 max-w-[113px]">
                        REJECTED
                    </p>
                `;
            }
        });
        calculateCount();
        
    }
    
});


function renderInterviewList(){
    filteredSection.innerHTML = '';
    if(interviewList.length === 0){
        filteredSection.innerHTML = ` 
                <div class="bg-white px-10 py-15 w-[1387.72px] h-[400px] mx-auto flex flex-col items-center justify-center">
                <img class="my-5" src="./Assests/file.png" alt="">
                <p class="font-semibold text-[#002c5cFF] text-[20px] ">No jobs Available</p>
                <p class="text-[#64748bFF] font-medium"><span id="available-count">Check back soon for new job opportunities</p>
                </div>`;
        return;
    }
    for (let job of interviewList) {
        const div = document.createElement('div');
        div.classList.add('bg-white', 'flex', 'justify-between', 'p-6', 'rounded-lg',  'border', 'border-[#f1f2f4FF]');
        div.innerHTML = `
            <div class="space-y-5">
                    <div>
                        <p class=" company-name font-semibold text-[#002c5cFF] text-[20px] ">${job.companyName}</p>
                        <p class="position-name text-[#64748bFF] font-medium">${job.positionName}</p>
                    </div>
                    <p class="job-type text-[#64748bFF] font-medium">${job.jobType}</p>
                    <div class="space-y-2">
                        <p class="current-status text-[14px] bg-[#eef4ffFF] py-3 px-2 rounded-sm font-medium max-w-[113px] text-center"">${job.currentStatus}</p>
                        <p class="job-description text-[#323b49FF]">${job.jobDescription}</p>
                    </div>
                    <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                        <button  class="interview-btn rounded-sm py-1 px-3 border border-[#10b981FF] text-[#10b981FF] w-[113px]">INTERVIEW</button>
                        <button  class="rejected-btn rounded-sm py-1 px-3 border border-[#ef4444FF] text-[#ef4444FF] w-[113px]">REJECTED</button>
                    </div>
                </div>
                <!-- part 2 delete -->
                <div><div class="h-8 w-8 border border-[#64748b]/20 rounded-full text-center pt-1"><button><i class="fa-regular fa-trash-can"></i></button></div></div>
        `;
        filteredSection.appendChild(div);
    }
}

function renderRejectedList(){
    filteredSection.innerHTML = '';
    if(rejectedList.length === 0){
        filteredSection.innerHTML = ` 
                <div class="bg-white px-10 py-15 w-[1387.72px] h-[400px] mx-auto flex flex-col items-center justify-center">
                <img class="my-5" src="./Assests/file.png" alt="">
                <p class="font-semibold text-[#002c5cFF] text-[20px] ">No jobs Available</p>
                <p class="text-[#64748bFF] font-medium"><span id="available-count">Check back soon for new job opportunities</p>
                </div>`;
        return;
    }

    for (let job of rejectedList) {
        const div = document.createElement('div');
        div.classList.add(
            'bg-white',
            'flex',
            'justify-between',
            'p-6',
            'rounded-lg',
            'border',
            'border-[#f1f2f4FF]'
        );

        div.innerHTML = `
             <div class="space-y-5">
                    <div>
                        <p class=" company-name font-semibold text-[#002c5cFF] text-[20px] ">${job.companyName}</p>
                        <p class="position-name text-[#64748bFF] font-medium">${job.positionName}</p>
                    </div>
                    <p class="job-type text-[#64748bFF] font-medium">${job.jobType}</p>
                    <div class="space-y-2">
                        <!-- <button></button> -->
                        <p class="rejected-btn rounded-sm py-1 px-3 border border-[#ef4444FF] text-[#ef4444FF] max-w-[113px]">${job.currentStatus}</p>
                        <p class="job-description text-[#323b49FF]">${job.jobDescription}</p>
                    </div>
                    <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                        <button  class="interview-btn rounded-sm py-1 px-3 border border-[#10b981FF] text-[#10b981FF] w-[113px]">INTERVIEW</button>
                        <button  class="rejected-btn rounded-sm py-1 px-3 border border-[#ef4444FF] text-[#ef4444FF] w-[113px]">REJECTED</button>
                    </div>
                </div>
                <!-- part 2 delete -->
                <div><div class="h-8 w-8 border border-[#64748b]/20 rounded-full text-center pt-1"><button><i class="fa-regular fa-trash-can"></i></button></div></div>
        `;

        filteredSection.appendChild(div);
    }
}

// delete functionality
mainContainer.addEventListener('click', function(event){

    if(event.target.closest('.delete-btn')){
        const card = event.target.closest('.bg-white'); 
        card.remove();
        calculateCount();
    }

});