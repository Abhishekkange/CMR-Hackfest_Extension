// content.js

// Function to send content to the API for validation
async function validateContent(content) {
    try {
      const response = await fetch('http://127.0.0.1:5000/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ news: content }),
      });
      const data = await response.json();
      return data.isValid;  // Assuming the API returns a JSON with an 'isValid' boolean
    } catch (error) {
      console.error('Error validating content:', error);
      return false;
    }
  }
  
  // Function to highlight fake content
  function highlightFakeContent(element) {
    const boundingBox = element.getBoundingClientRect();
    const highlightBox = document.createElement('div');
    highlightBox.style.position = 'absolute';
    highlightBox.style.top = `${boundingBox.top + window.scrollY - 10}px`;
    highlightBox.style.left = `${boundingBox.left + window.scrollX - 10}px`;
    highlightBox.style.width = `${boundingBox.width + 20}px`;
    highlightBox.style.height = `${boundingBox.height + 20}px`;
    highlightBox.style.border = '2px solid red';
    highlightBox.style.zIndex = '9999';
    highlightBox.style.pointerEvents = 'none';
  
    const fakeText = document.createElement('div');
    fakeText.textContent = 'FAKE CONTENT';
    fakeText.style.position = 'absolute';
    fakeText.style.top = `${boundingBox.top + window.scrollY - 25}px`;
    fakeText.style.left = `${boundingBox.left + window.scrollX + 10}px`;
    fakeText.style.fontSize = '12px';
    fakeText.style.color = 'red';
    fakeText.style.fontWeight = 'bold';
    fakeText.style.zIndex = '9999';
  
    document.body.appendChild(highlightBox);
    document.body.appendChild(fakeText);
  }
  
  // Function to scrape relevant tags and validate
  function scrapeAndValidate() {
    const tags = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6, p')];
    tags.forEach(async (tag) => {
      const content = tag.innerText;
      const isValid = await validateContent(content);
    
  
      if (!isValid) {
        highlightFakeContent(tag);
      }
    });
  }
  
  // Start scraping and validating once the DOM is fully loaded
  window.addEventListener('load', scrapeAndValidate);
  