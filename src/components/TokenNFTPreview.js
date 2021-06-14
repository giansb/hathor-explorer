import React, { useState, useEffect } from 'react';
import TagManager from 'react-gtm-module';

const TokenNFTPreview = (props) => {
  const [token, setToken] = useState(props.token);

  useEffect(() => {
    // ensure data binding with props.token re rendering when changed
    setToken(props.token);
    if (token.uid) {
      TagManager.dataLayer({
        dataLayer: {
          event: 'LoadNFTPreview',
          tokenId: token.uid
        }
      });
    }
  }, [props.token]);

  if (!token.meta.nft) {
    return null;
  }

  const onPLayVideo = () => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'PlayNFTVideo',
        tokenId: token.uid
      }
    });
  }

  let media;

  if (token.meta.nft.type && token.meta.nft.type.toUpperCase() === 'IMAGE') {
    media = <img src={token.meta.nft.file} width="100%" height="100%" alt="NFT Preview" />;
  } else {
    media = (
      <video controls controlsList="nodownload noremoteplayback" disablePictureInPicture onPlay={onPLayVideo}>
        <source src={token.meta.nft.file} type="video/mp4" />
        Your browser does not support html video tag.
      </video>
    )
  }

  return (
    <div className="d-flex flex-column token-nft-preview">
      <p><strong>NFT preview</strong></p>
      <figure class="figure flex-fill p-4 d-flex align-items-center justify-content-center">
        { media }
      </figure>
    </div>        
  );
}

export default TokenNFTPreview;
