side_menu = document.getElementById("side_menu");
side_menu_width = 0;
let shifted = false;

// Calculate width of the side menu for a adjustment os node position
if (side_menu){
    side_menu_width = side_menu.offsetWidth;
    console.log(side_menu_width);
}

$('.drag').draggable({
  appendTo: 'body',
  helper: 'clone'
});

$('#network_scheme').droppable({
  activeClass: 'active',
  hoverClass: 'hover',
  accept: ":not(.ui-sortable-helper)", // Reject clones generated by sortable
  drop: function (e, ui) {
      type = ui.draggable.prop('id')

      if (type === 'host'){
          node_id = HostUid();
          nodes.push(
              {
                  data: {id: node_id, label: node_id},
                  renderedPosition: {x: ui.position.left - side_menu_width, y: ui.position.top},
                  classes: ['host'],
                  config: {
                      type: 'host',
                      label: node_id,
                  },
                  interface: [],
              }
          );

          // post new nodes to the server
          PostNodes();
          DrawGraph(nodes, edges);
          return;
      }

      if (type === 'l2_switch'){
          node_id = l2SwitchUid();
          nodes.push(
              {
                  data: {id: node_id, label: node_id},
                  renderedPosition: {x: ui.position.left - side_menu_width, y: ui.position.top},
                  classes: ['l2_switch'],
                  config: {
                      type: 'l2_switch',
                      label: node_id,
                  },
                  interface: [],
              }
          );

          PostNodes();
          DrawGraph(nodes, edges);
          return;
      }
  }
});

