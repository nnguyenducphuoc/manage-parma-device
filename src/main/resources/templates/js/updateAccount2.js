// scripts.js
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function openUpdateModal(button) {
  // Set modal data based on the row clicked (optional, for demonstration)
  openModal("updateModal");
}

function openAddModal() {
  openModal("addModal");
}

function updateUser() {
  const trangThai = document.getElementById("trangThai").value;
  const maChucVu = document.getElementById("maChucVu").value;
  alert(`Trạng Thái: ${trangThai}\nChức Vụ: ${maChucVu}`);
  closeModal("updateModal");
}

function addUser() {
  alert("Hãy nhập đầy đủ thông tin");
}
