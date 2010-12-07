class TreePanelComponent < Netzke::Base
  js_base_class "Ext.tree.TreePanel"

  js_properties(
    root: {
        text: 'Test node',
        leaf: 'true'
    }
  )
end