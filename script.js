document.addEventListener('DOMContentLoaded', () => {
    const dropZones = document.querySelectorAll('.drop-zone');
    const dragItems = document.querySelectorAll('.drag-item');
    const submitButton = document.getElementById('submit');
    const resultsForm = document.getElementById('results-form');
    const userNameInput = document.getElementById('user-name');
    const userNameHiddenInput = document.getElementById('user-name-input');
  
    let draggedItem = null;
  
    // Gestion du glisser-déposer
    dragItems.forEach(item => {
      item.addEventListener('dragstart', () => {
        draggedItem = item;
        item.classList.add('dragging');
      });
  
      item.addEventListener('dragend', () => {
        draggedItem = null;
        item.classList.remove('dragging');
      });
    });
  
    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
      });
  
      zone.addEventListener('drop', () => {
        if (draggedItem) {
          zone.appendChild(draggedItem);
        }
      });
    });
  
    // Soumission des résultats
    submitButton.addEventListener('click', () => {
      const results = {};
  
      // Récupérer le nom de l'utilisateur
      const userName = userNameInput.value.trim();
      if (!userName) {
        alert('Veuillez entrer votre nom ou identifiant.');
        return;
      }
  
      // Récupérer les éléments déposés dans chaque zone
      dropZones.forEach(zone => {
        const items = Array.from(zone.querySelectorAll('.drag-item'));
        results[zone.id] = items.map(item => item.textContent).join(', ');
      });
  
      // Remplir les champs cachés du formulaire
      userNameHiddenInput.value = userName;
      document.getElementById('supervised-input').value = results.supervised || 'Aucun';
      document.getElementById('unsupervised-input').value = results.unsupervised || 'Aucun';
      document.getElementById('deep-learning-input').value = results['deep-learning'] || 'Aucun';
  
      // Soumettre le formulaire
      resultsForm.submit();
      alert('Résultats envoyés !');
    });
  });