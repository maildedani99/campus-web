export const COURSE_TEMPLATE = `
<h2 style="margin-bottom: 16px;">CONTRATO DEL CURSO</h2>

<p><strong>CONTRATO DE PREVIA ACEPTACIÓN DE PAGO Y COMPROMISO DE ASISTENCIA</strong></p>

<p><strong>1. Partes del contrato</strong><br/>
Este contrato se celebra entre:  
<strong>Proveedor del Servicio:</strong> (en adelante, “Proveedor”)  
<strong>Cliente:</strong> con DNI (en adelante, “Cliente”).</p>

<p><strong>2. Objeto del Contrato</strong><br/>
El objeto de este contrato es regular las condiciones de pago anticipado, compromiso de asistencia y participación en el programa ofrecido por el Proveedor.</p>

<p><strong>3. Pago Anticipado</strong><br/>
El Cliente se compromete a realizar el pago completo del programa antes del inicio del mismo. El importe del programa es de € (impuestos incluidos). Este pago se realizará dividido en dos partes: un concepto de reserva de la plaza y el resto justo antes de comenzar el programa.</p>

<p><strong>Política de cancelación:</strong><br/>
En caso de cancelar la reserva con menos de 3 días de antelación, no será reembolsado bajo ningún concepto.</p>

<p><strong>4. Compromiso de Asistencia</strong><br/>
El Cliente se compromete a:  
• Asistir a la reunión inicial.  
• Asistir a las reuniones semanales programadas.  
• Participar activamente y cumplir con las tareas asignadas.  
• No ausentarse sin justificación repetidamente.</p>

<p><strong>Nota:</strong> El incumplimiento reiterado puede suponer expulsión del grupo sin reembolso.</p>

<p><strong>5. Descargo de Responsabilidad</strong><br/>
El Cliente reconoce y acepta que los resultados dependen de su participación y esfuerzo. El Proveedor no garantiza resultados específicos y no se responsabiliza por el incumplimiento de los objetivos del Cliente.</p>

<hr style="margin: 24px 0;" />

<h3>DATOS DEL CLIENTE</h3>

<p><strong>NOMBRE:</strong> {{data.client.firstName}} {{data.client.lastName}}<br/>
<strong>NÚMERO DNI:</strong> {{data.client.dni}}<br/>
<strong>FECHA DE NACIMIENTO:</strong> {{data.client.birthDate}}<br/>
<strong>DIRECCIÓN:</strong> {{data.client.address}}<br/>
<strong>C.P.:</strong> {{data.client.postalCode}}<br/>
<strong>CIUDAD:</strong> {{data.client.city}}<br/>
<strong>PROVINCIA:</strong> {{data.client.province}}<br/>
<strong>CORREO ELECTRÓNICO:</strong> {{data.client.email}}<br/>
<strong>TELÉFONO:</strong> {{data.client.phone}}</p>

<hr style="margin: 24px 0;" />

<h3>DATOS DEL RESPONSABLE DEL TRATAMIENTO</h3>

<p><strong>Identidad:</strong> {{data.provider.legalName}}<br/>
<strong>NIF:</strong> {{data.provider.nif}}<br/>
<strong>Dirección postal:</strong> {{data.provider.address}}<br/>
<strong>Teléfono:</strong> {{data.provider.phone}}<br/>
<strong>Correo electrónico:</strong> {{data.provider.email}}</p>

<hr style="margin: 24px 0;" />

<h3>TRATAMIENTO DE DATOS</h3>

<p>
“En REBIRTH - EL MÉTODO tratamos la información que nos facilita con el fin de prestarles el servicio solicitado y realizar su facturación.  
Los datos proporcionados se conservarán mientras se mantenga la relación comercial o durante el tiempo necesario para cumplir obligaciones legales y atender las posibles responsabilidades derivadas.
</p>

<p>
Los datos no se cederán a terceros salvo obligación legal.  
Usted puede ejercer sus derechos de acceso, rectificación, supresión, portabilidad, oposición y limitación mediante solicitud escrita dirigida a {{data.provider.email}} o a {{data.provider.address}}.
</p>

<p>
Si no está satisfecho con la respuesta del responsable del tratamiento, puede presentar una reclamación ante la Agencia Española de Protección de Datos (C/ Jorge Juan, 6 - 28001 Madrid).
</p>

<hr style="margin: 24px 0;" />

<h3>AUTORIZACIÓN ADICIONAL</h3>
<p>
<strong>TRATAMIENTO DE DATOS DEL CLIENTE:</strong> SI / NO<br/>
<strong>Fecha y firma:</strong><br/>
<strong>Lugar:</strong> {{data.doc.place}}, {{data.doc.date}}
</p>

`;
