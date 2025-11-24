export const LOPD_TEMPLATE = `
  <h2>POLITICA DE PROTECCION DE DATOS (LOPD)</h2>

  <p><strong>NOMBRE:</strong> {{data.client.firstName}}</p>
  <p><strong>APELLIDOS:</strong> {{data.client.lastName}}</p>
  <p><strong>NUMERO DNI:</strong> {{data.client.dni}}</p>
  <p><strong>FECHA DE NACIMIENTO:</strong> {{data.client.birthDate}}</p>
  <p><strong>DIRECCION:</strong> {{data.client.address}}</p>
  <p><strong>C.P.:</strong> {{data.client.postalCode}}</p>
  <p><strong>CIUDAD:</strong> {{data.client.city}}</p>
  <p><strong>PROVINCIA:</strong> {{data.client.province}}</p>
  <p><strong>CORREO ELECTRONICO:</strong> {{data.client.email}}</p>
  <p><strong>TELEFONO MOVIL:</strong> {{data.client.phone}}</p>

  <br/>

  <h3>Datos del responsable del tratamiento</h3>

  <p><strong>Identidad:</strong> {{data.provider.legalName}} - NIF: {{data.provider.nif}}</p>
  <p><strong>Direccion postal:</strong> {{data.provider.address}}</p>
  <p><strong>Telefono:</strong> {{data.provider.phone}}</p>
  <p><strong>Correo electronico:</strong> {{data.provider.email}}</p>

  <br/>

  <p>
    En REBIRTH - EL METODO tratamos la informacion que nos facilita con el fin de prestarles
    el servicio solicitado y realizar su facturacion. Los datos proporcionados se conservaran
    mientras se mantenga la relacion comercial o durante el tiempo necesario para cumplir con
    las obligaciones legales y atender las posibles responsabilidades que pudieran derivar del
    cumplimiento de la finalidad para la que los datos fueron recabados.
  </p>

  <p>
    Los datos no se cederan a terceros salvo en los casos en que exista una obligacion legal.
    Usted tiene derecho a obtener informacion sobre si en REBIRTH - EL METODO estamos tratando
    sus datos personales, por lo que puede ejercer sus derechos de acceso, rectificacion,
    supresion, portabilidad de datos, oposicion y limitacion a su tratamiento ante
    REBIRTH - EL METODO, en {{data.provider.address}} o en la direccion electronica
    {{data.provider.email}}.
  </p>

  <p>
    Para ejercer sus derechos debera identificarse suficientemente en su solicitud por medios
    electronicos o mediante solicitud debidamente firmada. Si el responsable del tratamiento
    tuviese dudas razonables sobre la identidad del solicitante podra requerir informacion
    adicional necesaria para confirmar su identidad.
  </p>

  <p>
    Asimismo, si considera que no ha obtenido satisfaccion plena en el ejercicio de sus derechos,
    podra presentar una reclamacion ante la Agencia Espanola de Proteccion de Datos,
    C/ Jorge Juan, 6 - 28001 Madrid.
  </p>

  <br/>

  <p><strong>Fecha:</strong> {{data.doc.date}}</p>
  <p><strong>Lugar:</strong> {{data.doc.place}}</p>
`;
