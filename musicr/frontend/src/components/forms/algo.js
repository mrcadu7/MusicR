<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blur Background in Modal</title>
<style>
.modal {
    display: none;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
}

.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 0;
}
</style>
</head>
<body>

<button onclick="toggleModal()">Open Modal</button>

<div class="modal" id="modal">
    <span onclick="toggleModal()" style="cursor: pointer; position: absolute; top: 10px; right: 10px;">&#10006;</span>
    <p>This is a modal window</p>
</div>

<div class="overlay" id="overlay"></div>

<script>
function toggleModal() {
    var modal = document.getElementById('modal');
    var overlay = document.getElementById('overlay');
    
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    } else {
        modal.style.display = 'block';
        overlay.style.display = 'block';
    }
}
</script>

</body>
</html>