document.addEventListener('DOMContentLoaded', fetchData)

async function fetchData() {
    try {

        const url = `http://localhost:5000/selectMaterialData`

        const response = await fetch(url)

        const data = await response.json()

        const dataTable = document.getElementById('data-table')

        dataTable.innerHTML = '' // Limpiar la tabla antes de agregar nuevos datos
        data.forEach((material) => {
            const row = document.createElement('tr')
            row.style.height = '100px'; // Ajusta la altura de la fila según sea necesario
            row.innerHTML = `
                <td class="py-2 border-b border-r text-center">${material.id_materiales}</td>

                <td class="py-2 border-b border-r text-center">
                    <img class="rounded-full h-10 w-10 mx-auto cursor-pointer transition-transform duration-300" src="${material.foto_materiales}" alt="Foto de perfil" onclick="enlargeImage(this)">
                </td>

                <td class="py-2 border-b border-r text-center">${material.descripcion_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.tipo_moneda_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.unidad_medida_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.valor_unitario_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.fabricacion_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.margen_materiales}</td>
                <td class="py-2 border-b border-r text-center">%</td>
                <td class="py-2 border-b border-r text-center">${material.costo_unitario_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.dimension_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.unidad_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.precio_producto_materiales}</td>
                <td class="py-2 border-b border-r text-center">${material.proveedor_materiales}</td>
                <td class="flex items-center justify-center h-full w-full mb-2" style="text-align: center; height: inherit;">
                    <button class="bg-gray-500 text-white px-3 py-2 rounded mr-2" onclick="editMaterial(${material.id_materiales}, '${material.foto_materiales}', '${encodeURIComponent(material.descripcion_materiales)}', '${encodeURIComponent(material.tipo_moneda_materiales)}', '${encodeURIComponent(material.unidad_medida_materiales)}', ${material.valor_unitario_materiales}, '${encodeURIComponent(material.fabricacion_materiales)}', ${material.margen_materiales}, ${material.costo_unitario_materiales}, ${material.dimension_materiales}, '${encodeURIComponent(material.unidad_materiales)}', ${material.precio_producto_materiales}, '${encodeURIComponent(material.proveedor_materiales)}')">
                        <i class="fa-solid fa-pencil" style="color:rgb(255, 255, 255);"></i>
                    </button>
                    <button class="bg-gray-500 text-white px-3 py-2 rounded" onclick="openDeleteModal(${material.id_materiales}, '${encodeURIComponent(material.descripcion_materiales)}')">
                        <i class="fa-solid fa-trash" style="color:rgb(255, 255, 255);"></i>
                    </button>
                </td>
            `;
            dataTable.appendChild(row)
        })
    } catch (error) {
        console.error('Error buscando los datos:', error)
    }
}

function enlargeImage(img) {
    const modal = document.createElement('div');
    modal.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'bg-black', 'bg-opacity-75', 'z-50');
    modal.innerHTML = `

        <div class="relative">
            <img src="${img.src}" class="w-[40em] h-[40em]">
            <button class="absolute top-0 right-0 m-2 rounded-full h-10 w-10 text-gray-500 text-6xl" onclick="closeImageModal(this)">×</button>
        </div>

        `;

    document.body.appendChild(modal);
}

function closeImageModal(button) {
    const modal = button.closest('div.fixed');
    modal.remove();
}

/* ---------------------------------------------------------------- AGREGAR MATERIALES ----------------------------------------------------------------------------- */

document
    .getElementById('addMaterialForm')
    .addEventListener('submit', async function (event) {

        event.preventDefault();

        const formData = new FormData(this);

        const foto_material = document.getElementById('addMaterialPhoto').value.trim();
        const descripcion_material = document.getElementById('addMaterialDescripcion').value.trim();
        const tipo_moneda_material = document.getElementById('addMaterialMoneda').value.trim();
        const unidad_medida_material = document.getElementById('addMaterialMedida').value.trim();
        const valor_unitario_material = document.getElementById('addMaterialValor').value.trim();
        const fabricacion_material = document.getElementById('addMaterialFabricacion').value.trim();
        const margen_material = document.getElementById('addMaterialMargen').value.trim();
        const costo_unitario_material = document.getElementById('addMaterialCosto').value.trim();
        const dimension_material = document.getElementById('addMaterialDimension').value.trim();
        const unidad_material = document.getElementById('addMaterialUnidad').value.trim();
        const precio_producto_material = document.getElementById('addMaterialPrecio').value.trim();
        const proveedor_material = document.getElementById('addMaterialProveedor').value.trim();

        console.log("Las variables de agregar: " + foto_material, descripcion_material, tipo_moneda_material, unidad_medida_material, valor_unitario_material, fabricacion_material, margen_material, costo_unitario_material, dimension_material, unidad_material, precio_producto_material, proveedor_material);

        formData.append('descripcion_material', descripcion_material);
        formData.append('tipo_moneda_material', tipo_moneda_material);
        formData.append('unidad_medida_material', unidad_medida_material);
        formData.append('valor_unitario_material', valor_unitario_material);
        formData.append('fabricacion_material', fabricacion_material);
        formData.append('margen_material', margen_material);
        formData.append('costo_unitario_material', costo_unitario_material);
        formData.append('dimension_material', dimension_material);
        formData.append('unidad_material', unidad_material);
        formData.append('precio_producto_material', precio_producto_material);
        formData.append('proveedor_material', proveedor_material);

        if (foto_material) {
            formData.append('foto_material', foto_material); // Append the file object directly
        }

        try {

            const url = `http://localhost:5000/addMaterial`

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            console.log('Material agregado:', JSON.stringify(data));

            closeModal();
            fetchData();

        } catch (error) {
            console.error('Error al agregar al material:', error);
        }
    });

function openAddModal() {
    document.getElementById('addModal').classList.remove('hidden')
}

document
    .getElementById('addMaterialPhoto')
    .addEventListener('change', function (event) {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                document.getElementById('addPhotoPreview').src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    })


/* ---------------------------------------------------------------- ELIMINAR MATERIAL ----------------------------------------------------------------------------- */


let materialIdToDelete = null

function openDeleteModal(id_materiales, descripcion_materiales) {
    materialIdToDelete = id_materiales
    document.getElementById(
        'deleteMessage'
    ).textContent = `¿Está seguro de que desea eliminar al material ${decodeURIComponent(descripcion_materiales)} de la base de datos?`
    document.getElementById('deleteModal').classList.remove('hidden')
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.add('hidden')
}

async function confirmDelete() {
    if (materialIdToDelete === null) {
        console.error('No se especifico un ID para proceder con la eliminación.');
        return;
    }

    try {
        console.log("Material a eliminar: " + materialIdToDelete);

        const url = `http://localhost:5000/deleteMaterial/${materialIdToDelete}`

        const response = await fetch(url, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorMessage = response.status === 404
                ? `Material with ID ${materialIdToDelete} not found.`
                : `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log('Material eliminado:', JSON.stringify(data));

        closeDeleteModal();
        fetchData();

    } catch (error) {
        console.error('Error eliminando al material: ', error);
    }
}

/* ---------------------------------------------------------------- EDITAR MATERIAL ----------------------------------------------------------------------------- */

document
    .getElementById('editMaterialForm')
    .addEventListener('submit', async function (event) {

        event.preventDefault()

        const formData = new FormData(this);

        const id_materiales = document.getElementById('editMaterialId').value.trim();

        const foto_materiales = document.getElementById('editMaterialPhoto').value.trim();
        const descripcion_materiales = document.getElementById('editMaterialDescripcion').value.trim();
        const tipo_moneda_materiales = document.getElementById('editMaterialMoneda').value.trim();

        const unidad_medida_materiales = document.getElementById('editMaterialMedida').value.trim();
        const valor_unitario_materiales = document.getElementById('editMaterialValor').value.trim();
        const fabricacion_materiales = document.getElementById('editMaterialFabricacion').value.trim();
        const margen_materiales = document.getElementById('editMaterialMargen').value.trim();
        const costo_unitario_materiales = document.getElementById('editMaterialCosto').value.trim();
        const dimension_materiales = document.getElementById('editMaterialDimension').value.trim();
        const unidad_materiales = document.getElementById('editMaterialUnidad').value.trim();
        const precio_producto_materiales = document.getElementById('editMaterialPrecio').value.trim();
        const proveedor_materiales = document.getElementById('editMaterialProveedor').value.trim();

        formData.append('id_materiales', id_materiales);
        formData.append('descripcion_materiales', descripcion_materiales);
        formData.append('tipo_moneda_materiales', tipo_moneda_materiales);
        formData.append('unidad_medida_materiales', unidad_medida_materiales);
        formData.append('valor_unitario_materiales', valor_unitario_materiales);
        formData.append('fabricacion_materiales', fabricacion_materiales);
        formData.append('margen_materiales', margen_materiales);
        formData.append('costo_unitario_materiales', costo_unitario_materiales);
        formData.append('dimension_materiales', dimension_materiales);
        formData.append('unidad_materiales', unidad_materiales);
        formData.append('precio_producto_materiales', precio_producto_materiales);
        formData.append('proveedor_materiales', proveedor_materiales);

        if (foto_materiales) {
            formData.append('foto_materiales', foto_materiales); // Append the file object directly
        }

        try {

            const url = `http://localhost:5000/updateMaterial/${id_materiales}`

            const response = await fetch(
                url,
                {
                    method: 'PUT',
                    body: formData,
                }
            )

            const data = await response.json()

            console.log('Material actualizado:', data);

            closeModal()
            fetchData()

        } catch (error) {
            console.error('Error al actualizar al usuario:', error)
        }

    })


async function editMaterial(
    id_materiales,
    foto_materiales,
    descripcion_materiales,
    tipo_moneda_materiales,
    unidad_medida_materiales,
    valor_unitario_materiales,
    fabricacion_materiales,
    margen_materiales,
    costo_unitario_materiales,
    dimension_materiales,
    unidad_materiales,
    precio_producto_materiales,
    proveedor_materiales
) {

    document.getElementById('editMaterialId').value = id_materiales;

    document.getElementById('editMaterialPhoto').value = ''; // Clear the file input
    document.getElementById('newPhotoPreview').src = ''; // Clear the new image preview
    document.getElementById('currentPhoto').src = foto_materiales;

    document.getElementById('editMaterialDescripcion').value = decodeURIComponent(descripcion_materiales);
    document.getElementById('editMaterialMoneda').value = decodeURIComponent(tipo_moneda_materiales);

    document.getElementById('editMaterialMedida').value = decodeURIComponent(unidad_medida_materiales);
    document.getElementById('editMaterialValor').value = valor_unitario_materiales;
    document.getElementById('editMaterialFabricacion').value = decodeURIComponent(fabricacion_materiales);
    document.getElementById('editMaterialMargen').value = margen_materiales;
    document.getElementById('editMaterialCosto').value = costo_unitario_materiales;
    document.getElementById('editMaterialDimension').value = dimension_materiales;
    document.getElementById('editMaterialUnidad').value = decodeURIComponent(unidad_materiales);
    document.getElementById('editMaterialPrecio').value = precio_producto_materiales;
    document.getElementById('editMaterialProveedor').value = decodeURIComponent(proveedor_materiales);

    document.getElementById('editModal').classList.remove('hidden');

}

document
    .getElementById('editMaterialPhoto')
    .addEventListener('change', function (event) {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                document.getElementById('newPhotoPreview').src = e.target.result
            }
            reader.readAsDataURL(file)
        }
    })

// Función para mostrar el modal de confirmación y actualizar la página
function showConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    modal.classList.remove('hidden');

    // Actualizar la página cuando se cierra el modal
    document.getElementById('refreshPageButton').addEventListener('click', function () {
        location.reload();
    });
}

/* ---------------------------------------------------------------- ORDENAR TABLA ----------------------------------------------------------------------------- */

function sortTable(column) {
    const table = document.querySelector('tbody')
    const rows = Array.from(table.getElementsByTagName('tr'))
    const isAscending = table.getAttribute('data-sort-order') === 'asc'
    table.setAttribute('data-sort-order', isAscending ? 'desc' : 'asc')

    rows.sort((a, b) => {
        const cellA = a
            .getElementsByTagName('td')
        [column].innerText.toLowerCase()
        const cellB = b
            .getElementsByTagName('td')
        [column].innerText.toLowerCase()

        if (cellA < cellB) return isAscending ? -1 : 1
        if (cellA > cellB) return isAscending ? 1 : -1
        return 0
    })

    rows.forEach((row) => table.appendChild(row))
}

function closeModal() {
    document.getElementById('editModal').classList.add('hidden')
    document.getElementById('addModal').classList.add('hidden')
}

// Llamar a la función fetchData cuando el DOM esté completamente cargado

document.addEventListener('DOMContentLoaded', fetchData)
