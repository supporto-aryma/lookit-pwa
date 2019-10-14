<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

$json = array(
  'labels' =>
  array(
    'reviewsTab' => 'Recensioni',
    'allergensFilterBtn' => 'Clicca per allergie o intolleranze',
    'languageBtn' => 'Cambia Lingua',
    'callBtn' => 'Chiama',
    'indicationsBtn' => 'Indicazione',
    'bookingBtn' => 'Prenota',
    'webSiteBtn' => 'Sito Web',
    'openingHours' => 'Orari di apertura',
    'allergensOptionBtn' => 'Allergeni',
    'addBtn' => 'Aggiungi',
    'ordersTitle' => 'Ordine',
    'noOrders' => 'Non ci sono ordini',
    'total' => 'Totale',
    'orderSummary' => 'Riepilogo ordine',
    'order' => 'Ordina',
    'wouldLikeToOrder' => 'Vorrei ordinare',
    'showWaiter' => 'Mostra al camariere',
    'sendToRestaurant' => 'Invia al Ristorante',
    'orderFromHome' => 'Ordina da Casa',
    'filterForAllergens' => 'Filtro per allergeni',
    'applyFilters' => 'Applica Filtri',
    'listHasBeenFiltered' => 'L\'elenco è stato filtrato',
    'close' => 'Chiudi',
    'allergensList' =>
    array(
      0 => 'Cereali/glutine',
      1 => 'Crostacei',
      2 => 'Uova',
      3 => 'Pesce',
      4 => 'Arachidi',
      5 => 'Soia',
      6 => 'Latte',
      7 => 'Frutta a guscio',
      8 => 'Sedano',
      9 => 'Senape',
      10 => 'Sesamo',
      11 => 'Solfiti',
      12 => 'Lupini',
      13 => 'Molluschi',
    ),
    'gt_translate_keys' =>
    array(
      0 =>
      array(
        'key' => 'reviewsTab',
        'format' => 'text',
      ),
      1 =>
      array(
        'key' => 'allergensFilterBtn',
        'format' => 'text',
      ),
      2 =>
      array(
        'key' => 'languageBtn',
        'format' => 'text',
      ),
      3 =>
      array(
        'key' => 'callBtn',
        'format' => 'text',
      ),
      4 =>
      array(
        'key' => 'indicationsBtn',
        'format' => 'text',
      ),
      5 =>
      array(
        'key' => 'bookingBtn',
        'format' => 'text',
      ),
      6 =>
      array(
        'key' => 'webSiteBtn',
        'format' => 'text',
      ),
      7 =>
      array(
        'key' => 'openingHours',
        'format' => 'text',
      ),
      8 =>
      array(
        'key' => 'allergensOptionBtn',
        'format' => 'text',
      ),
      9 =>
      array(
        'key' => 'addBtn',
        'format' => 'text',
      ),
      10 =>
      array(
        'key' => 'ordersTitle',
        'format' => 'text',
      ),
      11 =>
      array(
        'key' => 'noOrders',
        'format' => 'text',
      ),
      12 =>
      array(
        'key' => 'total',
        'format' => 'text',
      ),
      13 =>
      array(
        'key' => 'orderSummary',
        'format' => 'text',
      ),
      14 =>
      array(
        'key' => 'order',
        'format' => 'text',
      ),
      15 =>
      array(
        'key' => 'wouldLikeToOrder',
        'format' => 'text',
      ),
      16 =>
      array(
        'key' => 'showWaiter',
        'format' => 'text',
      ),
      17 =>
      array(
        'key' => 'sendToRestaurant',
        'format' => 'text',
      ),
      18 =>
      array(
        'key' => 'orderFromHome',
        'format' => 'text',
      ),
      19 =>
      array(
        'key' => 'filterForAllergens',
        'format' => 'text',
      ),
      20 =>
      array(
        'key' => 'applyFilters',
        'format' => 'text',
      ),
      21 =>
      array(
        'key' => 'listHasBeenFiltered',
        'format' => 'text',
      ),
      22 =>
      array(
        'key' => 'close',
        'format' => 'text',
      ),
      23 =>
      array(
        'key' => 'allergensList',
        'format' => 'list',
      ),
    ),
  ),
);

echo json_encode($json);
