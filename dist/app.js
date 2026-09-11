const form = document.querySelector('#trip-form');
const dateInput = form.elements.date;
const returnInput = form.elements.returnDate;
const localToday = new Date();
const today = `${localToday.getFullYear()}-${String(localToday.getMonth() + 1).padStart(2, '0')}-${String(localToday.getDate()).padStart(2, '0')}`;
dateInput.min = today;
returnInput.min = today;
document.querySelector('#year').textContent = localToday.getFullYear();
form.elements.pickup.value = 'New Delhi';
function clearStatus() { document.querySelector('#form-status').hidden = true; }
form.addEventListener('input', clearStatus);
form.addEventListener('change', () => {
  const type = form.elements.tripType.value;
  const isRound = type === 'Round trip';
  document.querySelector('#return-field').hidden = !isRound;
  returnInput.required = isRound;
  returnInput.disabled = !isRound;
  returnInput.min = dateInput.value || today;
  document.querySelector('#destination-label').textContent = type === 'Local rental' ? 'Area / trip plans' : 'Destination';
  document.querySelector('#destination').placeholder = type === 'Local rental' ? 'e.g. Delhi sightseeing' : 'Where to?';
  document.querySelectorAll('[data-vehicle]').forEach(card => {
    const selected = card.dataset.vehicle === form.elements.vehicle.value;
    card.classList.toggle('is-selected', selected);
    card.setAttribute('aria-pressed', String(selected));
  });
  clearStatus();
});
document.querySelectorAll('[data-vehicle]').forEach(card => {
  card.setAttribute('aria-pressed', 'false');
  card.addEventListener('click', () => {
    form.elements.vehicle.value = card.dataset.vehicle;
    form.dispatchEvent(new Event('change'));
    document.querySelector('#enquiry').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    form.elements.vehicle.focus({ preventScroll: true });
  });
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const phone = form.elements.phone;
  const digits = phone.value.replace(/\D/g, '');
  phone.setCustomValidity(digits.length >= 10 && digits.length <= 15 ? '' : 'Please enter a mobile number with 10 to 15 digits.');
  for (const name of ['name', 'pickup', 'destination']) {
    form.elements[name].setCustomValidity(form.elements[name].value.trim() ? '' : 'Please fill in this field.');
  }
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const formatDate = value => new Date(`${value}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const lines = ['Hello Shivam Tour and Travels! I would like a quote for my trip.', '', `Trip: ${data.get('tripType')}`, `Pickup: ${data.get('pickup').trim()}`, `${data.get('tripType') === 'Local rental' ? 'Plans' : 'Destination'}: ${data.get('destination').trim()}`, `Travel date: ${formatDate(data.get('date'))}`];
  if (data.get('tripType') === 'Round trip') lines.push(`Return date: ${formatDate(data.get('returnDate'))}`);
  lines.push(`Vehicle: ${data.get('vehicle')}`, '', `Name: ${data.get('name').trim()}`, `Mobile: ${data.get('phone').trim()}`, '', 'Please share availability and a quote, including any tolls, parking and driver charges.');
  const url = `https://wa.me/917982850497?text=${encodeURIComponent(lines.join('\n'))}`;
  const status = document.querySelector('#form-status');
  status.replaceChildren(document.createTextNode('Your enquiry is ready. Tap Send in WhatsApp to share it with us. '));
  const link = document.createElement('a');
  link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Open WhatsApp';
  status.append(link); status.hidden = false;
  window.open(url, '_blank', 'noopener,noreferrer');
});
form.addEventListener('input', event => { if (event.target.setCustomValidity) event.target.setCustomValidity(''); });
