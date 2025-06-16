Feature: Página About

  Scenario: El usuario ve los títulos y contenido básico de la página About
    Given el usuario navega a la página About
    Then debería ver el título "Acerca de nosotros"
    And debería ver el subtítulo descriptivo del proyecto
    And debería ver la información del equipo

  Scenario: El usuario ve la sección de emojis del equipo
    Given el usuario navega a la página About
    Then debería ver la sección de emojis del equipo
    And debería ver el emoji de confusión
    And debería ver el emoji de frustración

  Scenario: El usuario ve y usa el formulario de feedback
    Given el usuario navega a la página About
    Then debería ver el formulario de feedback
    And debería poder escribir en el campo de opinión

  Scenario: El usuario interactúa con el formulario de feedback
    Given el usuario navega a la página About
    When el usuario escribe "Esta aplicación está genial" en el campo de opinión
    Then el campo debería mantener el texto escrito 