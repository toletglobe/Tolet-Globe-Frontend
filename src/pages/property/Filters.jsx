import { useState, useCallback } from "react";
import {
  Home,
  Apartment,
  Hotel,
  BusinessCenter,
  Storefront,
  Warehouse,
} from "@mui/icons-material";
import {
  Button,
  Menu,
  Radio,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

const FiltersBox = ({handleCloseFilter}) => {
  const [anchors, setAnchors] = useState({
    houses: null,
    flats: null,
    payingGuests: null,
  });

  const [filters, setFilters] = useState({
    houses: { bhk: "", houseType: "", preference: "" },
    flats: { bhk: "", houseType: "", preference: "" },
    payingGuests: { preference: "" },
  });

  const categories = [
    {
      label: "HOUSES",
      icon: <Home fontSize="small" />,
      hasDropdown: true,
      key: "houses",
    },
    {
      label: "FLATS",
      icon: <Apartment fontSize="small" />,
      hasDropdown: true,
      key: "flats",
    },
    {
      label: "PAYING GUESTS",
      icon: <Hotel fontSize="small" />,
      hasDropdown: true,
      key: "payingGuests",
    },
    {
      label: "OFFICES",
      icon: <BusinessCenter fontSize="small" />,
      hasDropdown: false,
    },
    {
      label: "SHOPS",
      icon: <Storefront fontSize="small" />,
      hasDropdown: false,
    },
    {
      label: "WAREHOUSES",
      icon: <Warehouse fontSize="small" />,
      hasDropdown: false,
    },
  ];

  const handleMenuOpen = (event, type) => {
    setAnchors((prev) => ({ ...prev, [type]: event.currentTarget }));
  };

  const handleMenuClose = (type) => {
    setAnchors((prev) => ({ ...prev, [type]: null }));
  };

  const handleFilterChange = (category, filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: { ...prev[category], [filterType]: value },
    }));
  };

  const handleClear = useCallback((category) => {
    setFilters((prev) => ({
      ...prev,
      [category]:
        category === "payingGuests"
          ? { preference: "" }
          : { bhk: "", houseType: "", preference: "" },
    }));
  }, []);

  const renderMenu = (category) => (
    <Menu
      anchorEl={anchors[category]}
      open={Boolean(anchors[category])}
      onClose={() => handleMenuClose(category)}
      PaperProps={{
        sx: {
          width: category === "payingGuests" ? 300 : 500,
          padding: 3,
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      {category !== "payingGuests" ? (
        <>
          {/* BHK Section */}
          <Box mb={3}>
            <Typography variant="subtitle2" fontWeight={600} mb={2}>
              BHK
            </Typography>
            <Box display="flex" gap={2}>
              {["+1BHK", "+2BHK", "+3BHK", "+4BHK", "+>4BHK"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Radio
                      size="small"
                      checked={filters[category].bhk === option}
                      onChange={() =>
                        handleFilterChange(category, "bhk", option)
                      }
                      sx={{
                        color: "#4A7F79",
                        "&.Mui-checked": { color: "#4A7F79" },
                      }}
                    />
                  }
                  label={option}
                  sx={{
                    margin: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* House Type Section */}
          <Box mb={3}>
            <Typography variant="subtitle2" fontWeight={600} mb={2}>
              House Type
            </Typography>
            <Box display="flex" gap={2} flexWrap="wrap">
              {["Fully-Furnished", "Semi-Furnished", "Non-Furnished"].map(
                (option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Radio
                        size="small"
                        checked={filters[category].houseType === option}
                        onChange={() =>
                          handleFilterChange(category, "houseType", option)
                        }
                        sx={{
                          color: "#4A7F79",
                          "&.Mui-checked": { color: "#4A7F79" },
                        }}
                      />
                    }
                    label={option}
                    sx={{
                      margin: 0,
                      "& .MuiFormControlLabel-label": {
                        fontSize: "0.875rem",
                      },
                    }}
                  />
                )
              )}
            </Box>
          </Box>
        </>
      ) : null}

      {/* Preference Section */}
      <Box mb={3}>
        <Typography variant="subtitle2" fontWeight={600} mb={2}>
          Preference
        </Typography>
        <Box display="flex" gap={2}>
          {category === "payingGuests"
            ? ["Girls", "Boys"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Radio
                      size="small"
                      checked={filters[category].preference === option}
                      onChange={() =>
                        handleFilterChange(category, "preference", option)
                      }
                      sx={{
                        color: "#4A7F79",
                        "&.Mui-checked": { color: "#4A7F79" },
                      }}
                    />
                  }
                  label={option}
                  sx={{
                    margin: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              ))
            : ["Family", "Bachelors"].map((option) => (
                <FormControlLabel
                  key={option}
                  control={
                    <Radio
                      size="small"
                      checked={filters[category].preference === option}
                      onChange={() =>
                        handleFilterChange(category, "preference", option)
                      }
                      sx={{
                        color: "#4A7F79",
                        "&.Mui-checked": { color: "#4A7F79" },
                      }}
                    />
                  }
                  label={option}
                  sx={{
                    margin: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              ))}
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
        <Button
          onClick={() => handleClear(category)}
          sx={{
            color: "#4A7F79",
            textTransform: "none",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => handleMenuClose(category)}
          variant="contained"
          sx={{
            backgroundColor: "#4A7F79",
            "&:hover": { backgroundColor: "#3a645e" },
            textTransform: "none",
            fontSize: "0.875rem",
            borderRadius: "6px",
            px: 3,
            py: 1,
          }}
        >
          Done
        </Button>
        <Button
    onClick={handleCloseFilter}
    sx={{
      color: "#4A7F79",
      textTransform: "none",
      fontSize: "0.875rem",
      fontWeight: 500,
    }}
  >
    Close
  </Button>
      </Box>
    </Menu>
  );

  return (
    <div className="w-full bg-white px-4 py-2 flex items-center gap-2">
      {categories.map((cat) => (
        <Button
          key={cat.label}
          variant="outlined"
          startIcon={cat.icon}
          endIcon={cat.hasDropdown ? <ArrowDropDown /> : null}
          onClick={(e) => cat.hasDropdown && handleMenuOpen(e, cat.key)}
          sx={{
            minWidth: "auto",
            padding: "6px 12px",
            borderRadius: "8px",
            borderColor: "#4A7F79",
            color: "#4A7F79",
            textTransform: "none",
            "&:hover": {
              backgroundColor: cat.hasDropdown ? "#4A7F79" : "transparent",
              color: cat.hasDropdown ? "white" : "#4A7F79",
              "& .MuiSvgIcon-root": {
                color: cat.hasDropdown ? "white" : "#4A7F79",
              },
            },
            pointerEvents: cat.hasDropdown ? "auto" : "none",
          }}
        >
          <span className="text-xs font-medium">{cat.label}</span>
        </Button>
      ))}

      {/* Render all dropdown menus */}
      {categories.map((cat) => cat.hasDropdown && renderMenu(cat.key))}
    </div>
  );
};

export default FiltersBox;