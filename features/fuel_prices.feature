Feature: Visualización de precios de combustibles en gasolineras españolas

  Scenario: El usuario accede a la aplicación
    Given el usuario abre la aplicación de gasolineras
    When la aplicación carga la página principal
    Then el usuario ve el componente de precios de combustibles

  Scenario: La aplicación descarga los precios correctamente
    Given el usuario está en la página principal
    When la aplicación solicita los precios de combustibles a la API oficial
    Then la aplicación muestra una tabla con los precios de varias gasolineras

  Scenario: La API no responde o devuelve error
    Given el usuario está en la página principal
    When la aplicación no puede obtener los precios de la API
    Then la aplicación muestra un mensaje de error al usuario

  Scenario: El usuario ve los datos de una gasolinera
    Given la aplicación ha descargado los precios correctamente
    When el usuario visualiza la tabla de precios
    Then el usuario puede ver el nombre, dirección, municipio y precios de cada gasolinera

  Scenario: El usuario ve el estado de carga
    Given el usuario abre la aplicación
    When la aplicación está descargando los precios
    Then el usuario ve un mensaje de "Cargando precios..."