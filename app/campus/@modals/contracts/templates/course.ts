export const COURSE_TEMPLATE = `
CONTRATO DE PREVIA ACEPTACIÓN DE
PAGO Y COMPROMISO DE ASISTENCIA

1. Partes del Contrato
Este contrato se celebra entre:
Proveedor del Servicio: {{provider.name}} (en adelante, "Proveedor")
Cliente: {{client.firstName}} {{client.lastName}} con DNI {{client.dni}} (en adelante, "Cliente")

2. Objeto del Contrato
El objeto de este contrato es regular las condiciones de pago anticipado, compromiso de
asistencia y participación en el programa {{program.name}} ofrecido por el Proveedor.

3. Pago Anticipado
El Cliente se compromete a realizar el pago completo del programa {{program.name}} antes del
inicio del mismo. El importe del programa es de {{program.totalAmount}} € (impuestos incluidos).
Este pago se realizará dividido en dos partes.
{{program.depositAmount}}€ en concepto de reserva de la plaza
{{program.balanceAmount}}€ restantes justo antes de comenzar el programa.
En el caso de cancelar la reserva con menos de {{program.refundDays}} días de antelación del comienzo del
programa, ésta no será reembolsada al cliente en ningún caso, es decir, supondrá la pérdida del
importe de la misma.

4. Compromiso de Asistencia
El Cliente se compromete a:
Asistir a la reunión inicial del programa.
Asistir a las reuniones semanales programadas.
Participar activamente y cumplir con la mayoría de las actividades propuestas en el
programa.
La no asistencia en repetidas ocasiones sin justificación alguna supondrá la expulsión
directa del grupo y de la plataforma.
La no ejecución reiterada de las “tareas” a realizar, previo aviso de los terapeutas,
supondrá la directa expulsión del grupo y de la plataforma, aceptando el cliente el no
reembolso de la cantidad pagada. Eximiendo de toda responsabilidad al Proveedor

5. Descargo de Responsabilidad
El Cliente reconoce y acepta que:
Los resultados del programa {{program.name}} pueden variar dependiendo de la
participación y el esfuerzo individual.
El Proveedor no garantiza resultados específicos y no se responsabiliza por la falta de
consecución de los objetivos personales del Cliente.

Fecha y firma
NOMBRE: {{client.firstName}}
APELLIDOS: {{client.lastName}}
NUMERO DNI: {{client.dni}}
FECHA DE NACIMIENTO: {{client.birthDate}}
DIRECCIÓN: {{client.address}}
C.P. : {{client.postalCode}}
CIUDAD: {{client.city}}
PROVINCIA: {{client.province}}
CORREO ELECTRÓNICO: {{client.email}}
TELÉFONO MÓVIL: {{client.phone}}

Datos del responsable del tratamiento:
Identidad: {{provider.legalName}} - NIF: {{provider.nif}}
Dirección postal: {{provider.address}}
Teléfono: {{provider.phone}}
Correo electrónico: {{provider.email}}

“En REBIRTH- EL METODO tratamos la información que nos facilita con el fin de prestarles el servicio
solicitado y realizar su facturación. Los datos proporcionados se conservarán mientras se mantenga
la relación comercial o durante el tiempo necesario para cumplir con las obligaciones legales y
atender las posibles responsabilidades que pudieran derivar del cumplimiento de la finalidad para
la que los datos fueron recabados. Los datos no se cederán a terceros salvo en los casos en que
exista una obligación legal. Usted tiene derecho a obtener información sobre si en REBIRTH- EL
METODO estamos tratando sus datos personales, por lo que puede ejercer sus derechos de acceso,
rectificación, supresión y portabilidad de datos y oposición y limitación a su tratamiento ante
REBIRTH- EL METODO, {{provider.address}} o en la dirección electrónica
{{provider.email}}, identificándose suficientemente en su solicitud por medios
electrónicos o, en su defecto, mediante solicitud debidamente firmada. No obstante, si el
responsable del tratamiento tuviese dudas razonables en relación con la identidad de la persona
física que cursa la solicitud podrá solicitar que se facilite información adicional necesaria para
confirmar su identidad. Asimismo, y especialmente si considera que no ha obtenido satisfacción
plena en el ejercicio de sus derechos, podrá presentar una reclamación ante la autoridad nacional
de control dirigiéndose a estos efectos a la Agencia Española de Protección de Datos, C/ Jorge
Juan, 6 – 28001 Madrid.

Asimismo, solicitamos su autorización para ofrecerle productos y servicios
relacionados con los contratados y fidelizarle como cliente.”
TRATAMIENTO DE DATOS DEL CLIENTE: {{consents.marketing}}
SI / NO
Fecha y firma: {{doc.date}} · Lugar: {{doc.place}}
`;
