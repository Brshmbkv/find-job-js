const jobsContainer = document.querySelector('[data-jobs-container]')
const jobCardTemplate = document.querySelector('[data-job-card-template]')
const searchInput = document.getElementById('search_input')
const jobsCounter = document.querySelector('[data-jobs-counter]')

document.getElementById('search_btn').addEventListener('click',  () => {
  let text = searchInput.value.toLowerCase()
  getJobs().then( jobs => {
    let result = filterJobs(jobs, text)
    showJobs(result ?? jobs)
  })
})

searchInput.addEventListener('input', (event) => {
  if(event.target.value === '') {
    getJobs().then(data => {
      showJobs(data)
    })
  }
})

async function getJobs() {
  let response = await fetch('data.json')
  let data = await response.json()
  return data
}

function filterJobs(jobs, searchText) {
  if(!searchText) {
    return
  }
  let filteredJobs = jobs.filter(job => {
    if(job.roleName.toLowerCase().includes(searchText)
      || job.type.toLowerCase().includes(searchText)
      || job.company.toLowerCase().includes(searchText)
      || job.requirements.content.toLowerCase().includes(searchText)){
        return true
    }else {
      return false
    }
  })
  return filteredJobs
}

function showJobs(jobs) {
  jobsContainer.textContent = ''
  jobs.forEach(job => {
    const element = jobCardTemplate.content.cloneNode(true)
    element.querySelector('[data-job-card-image]').src = job.logo
    element.querySelector('[data-job-card-title]').textContent = job.roleName
    element.querySelector('[data-job-card-description]').textContent = job.requirements.content
    jobsContainer.append(element)
  })
  jobsCounter.textContent = jobs.length > 1 ? `Showing ${jobs.length} jobs` : `Showing ${jobs.length} job`
}

getJobs().then(data=> {
  showJobs(data)
  // console.log(data)
})
