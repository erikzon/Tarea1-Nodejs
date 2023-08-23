import { conectar } from "../modelo/db_conectar.js";

const crud_cliente = {};

crud_cliente.leer = (req, res) => {
    conectar.query('SELECT clientes.id_Clientes, clientes.Nit, clientes.Nombres, clientes.Apellidos, clientes.Dirección, clientes.Telefono, DATE_FORMAT(clientes.Fecha_Nacimiento, "%d-%m-%Y") as Fecha_Nacimiento FROM clientes;', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error fetching data from the database");
        } else {
            res.render('clientes/index', { resultado: results });
        }
    });
};

crud_cliente.cud = (req, res) => {
    const { btn_crear, btn_actualizar, btn_borrar, txt_id, txt_nit, txt_nombres, txt_apellidos, txt_direccion, txt_telefono, txt_fn } = req.body;

    if (btn_crear) {
        const newCliente = {
            Nit: txt_nit,
            Nombres: txt_nombres,
            Apellidos: txt_apellidos,
            Dirección: txt_direccion,
            Telefono: txt_telefono,
            Fecha_Nacimiento: txt_fn
        };

        conectar.query('INSERT INTO clientes SET ?', newCliente, (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error creando el cliente,");
            } else {
                res.redirect('/');
            }
        });
    } else if (btn_actualizar) {
        const updatedCliente = {
            Nit: txt_nit,
            Nombres: txt_nombres,
            Apellidos: txt_apellidos,
            Dirección: txt_direccion,
            Telefono: txt_telefono,
            Fecha_Nacimiento: txt_fn
        };

        conectar.query('UPDATE clientes SET ? WHERE id_Clientes = ?', [updatedCliente, txt_id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error actualizando el cliente.");
            } else {
                res.redirect('/');
            }
        });
    } else if (btn_borrar) {
        conectar.query('DELETE FROM clientes WHERE id_Clientes = ?', [txt_id], (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).send("Error eliminando el cliente.");
            } else {
                res.redirect('/');
            }
        });
    } else {
        res.status(400).send("Error 400");
    }
};

export { crud_cliente };
